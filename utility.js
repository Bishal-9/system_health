
const os = require("os")
const disk = require("diskusage")

const { format_bytes } = require("./helper")

const system_stats = async () => {

    // CPU Usage
    const cpus = os.cpus()
    const cpu_usage = cpus.map((cpu, index) => {
        const total = Object.values(cpu.times).reduce(
            (acc, time) => acc + time,
            0
        )
        const idle = cpu.times.idle
        const usage = ((total - idle) / total) * 100
        return { core: index, usage: usage.toFixed(2) + "%" }
    })

    // Memory Usage
    const total_memory = os.totalmem()
    const free_memory = os.freemem()
    const used_memory = total_memory - free_memory
    const memory_usage_percent = ((used_memory / total_memory) * 100).toFixed(2)

    // Disk Usage
    const path = os.platform() === "win32" ? "C:" : "/"
    const { available, free, total } = await disk.check(path)

    return {
        cpu: cpu_usage,
        memory: {
            total: format_bytes(total_memory),
            used: format_bytes(used_memory),
            free: format_bytes(free_memory),
            usage_percent: memory_usage_percent + "%",
        },
        disk: {
            total: format_bytes(total),
            free: format_bytes(free),
            used: format_bytes(total - free),
            available: format_bytes(available),
            usage_percent: (((total - free) / total) * 100).toFixed(2) + "%",
        },
    }
}

module.exports = {
    system_stats,
}
