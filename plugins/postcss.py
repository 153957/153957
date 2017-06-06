import subprocess


def postBuild(site):
    command = (
        'nvm use && yarn run postcss')
    )

    subprocess.check_call(command, shell=True)
