import sys
import io
import subprocess
def handler(event, context):
    language = event.get('language','python')
    if language=='python':
        result = execute_python_code(code)
    elif language=='java':
        result = execute_java_code(code)
    elif language=='cpp':
        result = execute_cpp_code(code)
    else:
        result = 'Unsupported Language ' + language

    return{
        'statusCode' : 200,
        'body' : result
    }