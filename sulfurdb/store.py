class SulfurDB:
    def __init__(self):
        self.store = {}

    def PING(self):
        return 'PONG'

    def SET(self, key, value):
        if(key == ""):
            return 'Key cannot be empty'
        self.store[key] = value
        return 'OK'        

    def GET(self, key=None):
        if (key is None):
            return 'Please provide a key'
        return self.store.get(key, None)

    def DELETE(self, key=None):
        if (key is None):
            return 'Please provide a key'
        if (key in self.store):
            self.store.pop(key, None)
            return '1'
        return '0'

    def EXISTS(self, key=None):
        if (key is None):
            return 'Please provide a key'
        if (key in self.store):
            return '1'
        return '0'