import json
import os
import subprocess
import sys
import tempfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


HOST = "127.0.0.1"
PORT = 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


def build_runner_script(code: str, function_name: str, tests: list[dict]) -> str:
    payload = json.dumps(tests, ensure_ascii=False)
    return f"""
import json
import traceback

{code}

tests = json.loads({payload!r})
fn = globals().get({function_name!r})

if fn is None:
    print(json.dumps({{"ok": False, "message": "未找到函数：{function_name}"}}))
    raise SystemExit(0)

def normalize(value):
    if isinstance(value, list):
        normalized_items = [normalize(item) for item in value]
        if all(not isinstance(item, (dict, list)) for item in normalized_items):
            return normalized_items
        return sorted(normalized_items, key=lambda item: json.dumps(item, ensure_ascii=False, sort_keys=True))
    if isinstance(value, dict):
        return {{key: normalize(val) for key, val in sorted(value.items())}}
    return value

visible_count = sum(1 for test in tests if not test.get("hidden"))
hidden_count = sum(1 for test in tests if test.get("hidden"))

for index, test in enumerate(tests, start=1):
    args = test["input"]
    expected = test["expected"]
    try:
        actual = fn(*args)
    except Exception:
        print(json.dumps({{
            "ok": False,
            "message": "第 {{}} 个测试运行报错：\\n{{}}".format(index, traceback.format_exc())
        }}, ensure_ascii=False))
        raise SystemExit(0)

    if normalize(actual) != normalize(expected):
        if test.get("hidden"):
            message = "第 {{}} 个隐藏测试未通过。请重点检查边界条件、空输入、重复值、极端长度等情况。".format(index)
        else:
            message = "第 {{}} 个测试未通过。输入 = {{}}，期望 = {{}}，实际 = {{}}".format(index, args, expected, actual)
        print(json.dumps({{
            "ok": False,
            "message": message,
            "visibleCount": visible_count,
            "hiddenCount": hidden_count,
            "failedHidden": bool(test.get("hidden"))
        }}, ensure_ascii=False))
        raise SystemExit(0)

print(json.dumps({{
    "ok": True,
    "message": "共 {{}} 个测试全部通过，其中公开样例 {{}} 个，隐藏测试 {{}} 个。你现在可以回到上面的讲解，对照自己的实现总结为什么它是正确的。".format(len(tests), visible_count, hidden_count),
    "visibleCount": visible_count,
    "hiddenCount": hidden_count
}}, ensure_ascii=False))
"""


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_POST(self):
        if self.path != "/run-practice":
            self.send_error(404, "Not Found")
            return

        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length)
        try:
            payload = json.loads(raw.decode("utf-8"))
            code = payload["code"]
            function_name = payload["functionName"]
            tests = payload["tests"]
        except Exception:
            self._send_json({"ok": False, "message": "请求格式错误。"}, status=400)
            return

        script = build_runner_script(code, function_name, tests)
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False, encoding="utf-8") as tmp:
          tmp.write(script)
          temp_path = tmp.name

        try:
            result = subprocess.run(
                [sys.executable, temp_path],
                capture_output=True,
                text=True,
                encoding="utf-8",
                timeout=5,
                cwd=ROOT,
            )
            output = result.stdout.strip() or result.stderr.strip()
            try:
                data = json.loads(output)
            except Exception:
                data = {"ok": False, "message": output or "运行失败，且没有返回可解析结果。"}
            self._send_json(data)
        except subprocess.TimeoutExpired:
            self._send_json({"ok": False, "message": "运行超时，请检查是否出现死循环。"})
        finally:
            try:
                os.remove(temp_path)
            except OSError:
                pass

    def _send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Python Platform server running at http://{HOST}:{PORT}")
    server.serve_forever()
