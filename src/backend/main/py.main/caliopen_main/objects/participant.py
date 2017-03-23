# -*- coding: utf-8 -*-
"""Caliopen message object classes."""
from __future__ import absolute_import, print_function, unicode_literals

import types

from uuid import UUID
from caliopen_main.objects import base


class Participant(base.ObjectJsonDictifiable):
    """attachment's attributes, nested within message object"""

    _attrs = {
        'address': types.StringType,
        'contact_ids': [UUID],
        'label': types.StringType,
        'protocol': types.StringType,
        'type': types.StringType
    }
