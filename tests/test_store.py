from sulfurdb import SulfurDB

SulfurDB = SulfurDB()

print(SulfurDB.PING())
print(SulfurDB.SET("sulfurcodes", "19"))
print(SulfurDB.GET("sulfurcodes"))
print(SulfurDB.EXISTS("sulfurcodes"))
print(SulfurDB.DELETE("sulfurcodes"))
print(SulfurDB.EXISTS("sulfurcodes"))