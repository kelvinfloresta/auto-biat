import sys
import pyautogui

result = eval(sys.argv[1])

if (result is not None):
    print(result)
else:
    print('null', end='')
