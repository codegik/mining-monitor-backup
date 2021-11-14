const properties = {
    local_database_url: "mongodb://localhost:27017/vminer",
    backup_database_url: "mongodb://localhost:27017/vminer-backup"
};

for (var key in process.env) {
    if (process.env.hasOwnProperty(key) && properties[key] && process.env[key]) {
        properties[key] = process.env[key];
    }
}

module.exports = properties;