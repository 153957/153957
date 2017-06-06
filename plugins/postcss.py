import subprocess


def postBuild(site):
    command = 'yarn run postcss'

    subprocess.check_call(command, shell=True)
