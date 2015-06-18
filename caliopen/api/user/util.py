# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
import binascii


def create_token(size=40):
    return binascii.hexlify(os.urandom(int(size/2))).decode('ascii')
