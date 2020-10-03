#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import wandb


def how_to_use():
    print('\'!wand init [ENTITY] [PROJECT]\' : Where entity is your username ' +
          'and project the targeted project.')


def init(entity, project):
    try:
        api = wandb.Api()
        runs = api.runs(f'{entity}/{project}')
        print(f'{runs.convert_objects}', file=sys.stderr)
        print('```autohotkey')
        print(f'api_key: {api.api_key}')
        print(f'entity name: {runs.entity}')
        print(f'project name: {runs.project}')
        print('```')
        return 0
    except:
        how_to_use()
        return 0


if __name__ == '__main__':
    if len(sys.argv) != 3:
        how_to_use()
        sys.exit(0)
    sys.exit(init(sys.argv[1], sys.argv[2]))
