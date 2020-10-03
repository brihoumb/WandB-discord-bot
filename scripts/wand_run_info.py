#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json
import wandb
import datetime


def how_to_use():
    print('\'!wand run info [ID]\' : ID from !wand project list.' +
          ' Keep ID in memory after first use.')


def run_info(entity, project, id):
    try:
        api = wandb.Api()
        run = api.run(f'{entity}/{project}/{id}')
        print('```autohotkey')
        for i in json.loads(run.json_config):
            if isinstance(json.loads(run.json_config)[i]["value"], str):
                print(f'{i}: %{json.loads(run.json_config)[i]["value"]}%')
            else:
                print(f'{i}: {json.loads(run.json_config)[i]["value"]}')
        info = {"loss": round(run.summary.__dict__["_root"]["loss"], 5),
                "val_loss": round(run.summary.__dict__["_root"]["val_loss"], 5),
                "acc": round(run.summary.__dict__["_root"]["acc"], 5),
                "val_acc": round(run.summary.__dict__["_root"]["val_acc"], 5),
                "epoch": round(run.summary.__dict__["_root"]["epoch"], 5),
                "timestamp": run.summary.__dict__["_root"]["_timestamp"],
                "runtime": run.summary.__dict__["_root"]["_runtime"]}
        hist = run.scan_history()
        history = [row for row in hist]
        since = info["timestamp"] - (info["timestamp"] - info["runtime"])
        total = datetime.timedelta(seconds=since)
        hours = datetime.timedelta(seconds=total.seconds)
        format_time = f'{total.days}d {hours}'
        latest_val_acc = round(history[-2]["val_acc"], 5)
        print(f'[{project}][{id}][{format_time}][{info["epoch"]+1}]')
        print(f' - acc: {info["acc"]}')
        print(f' - val_acc: {info["val_acc"]}')
        print(f' - loss: {info["loss"]}')
        print(f' - val_loss: {info["val_loss"]}')
        print(f' - diff: {round(latest_val_acc - info["val_acc"], 5)}')
        print('```')
        return 0
    except:
        how_to_use()
        return 0


if __name__ == '__main__':
    if len(sys.argv) != 4:
        how_to_use()
        sys.exit(0)
    sys.exit(run_info(sys.argv[1], sys.argv[2], sys.argv[3]))
