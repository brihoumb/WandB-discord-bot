#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import wandb


def how_to_use():
    print('\'!wand project list\' : You should run !wand init first.')


def project_list(entity, project):
    try:
        api = wandb.Api()
        runs = api.runs(f'{entity}/{project}')
        print(f'{runs.convert_objects}', file=sys.stderr)
        print('```asciidoc')
        print('\tname\t\t\t\t\t id\n==================================')
        for object in runs.objects:
            spacer = (13 - len(object.name)) + 13
            print(f'{object.name}{" " * spacer}{object.id}')#\t{object.url}')
        print('```')
        return 0
    except:
        how_to_use()
        return 0


if __name__ == '__main__':
    if len(sys.argv) != 3:
        how_to_use()
        sys.exit(0)
    sys.exit(project_list(sys.argv[1], sys.argv[2]))
