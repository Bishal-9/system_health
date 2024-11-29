
const file_system = require("fs")

const date_time = () => {
    const d = new Date()

    return `${d.toLocaleDateString("en-IN", { dateStyle: "full" })}, ${d.toLocaleTimeString("en-IN", { timeStyle: "full" })}`
}

const remove_existing_file = _file_path => {
    try {
        file_system.accessSync(_file_path, file_system.constants.F_OK)

        file_system.unlinkSync(_file_path)
    } catch (_error) {}
}

const format_bytes = _bytes => {

    const decimals = 2

    if (_bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    const i = Math.floor(Math.log(_bytes) / Math.log(k))

    return parseFloat((_bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const store_in_file = (_file_path, _data_to_store) => {
    file_system.appendFileSync(_file_path, _data_to_store, { encoding: "utf-8" })
}

module.exports = {
    date_time,
    format_bytes,
    remove_existing_file,
    sleep,
    store_in_file
}
