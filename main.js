
const path = require("path")

const { date_time, remove_existing_file, sleep, store_in_file } = require("./helper")
const { system_stats } = require("./utility")

const main = async () => {

    const file_path = path.resolve(__dirname, "./system_health.csv")
    remove_existing_file(file_path)

    const _stats = await system_stats()
    let heading = "free_disk, available_disk, used_disk, total_disk, disk_usage_percent, free_memory, used_memory, total_memory, memory_usage_percent"
    _stats.cpu.forEach((_, index) => {
        heading = heading + `, cpu_core_${index + 1}`
    })
    heading = heading + "\n"
    store_in_file(file_path, heading)

    while (true) {
        console.info(`Logging at ${date_time()}`)

        const stats = await system_stats()
        console.log(`

            CPU:                                            ${JSON.stringify(stats.cpu)}

            Free Memory:                                    ${stats.memory.free}
            Used Memory:                                    ${stats.memory.used}
            Total Memory:                                   ${stats.memory.total}
            Memory Usage Percent:                           ${stats.memory.usage_percent}

            Free Disk:                                      ${stats.disk.free}
            Available Disk:                                 ${stats.disk.available}
            Used Disk:                                      ${stats.disk.used}
            Total Disk:                                     ${stats.disk.total}
            Disk Usage Percent:                             ${stats.disk.usage_percent}
            `)
        
        let data_to_log = `${stats.disk.free}, ${stats.disk.available}, ${stats.disk.used}, ${stats.disk.total}, ${stats.disk.usage_percent}, ${stats.memory.free}, ${stats.memory.used}, ${stats.memory.total}, ${stats.memory.usage_percent}`
        stats.cpu.forEach((cpu_core, index) => {
            data_to_log = data_to_log + `, ${cpu_core.usage}`
        })
        data_to_log = data_to_log + "\n"
        store_in_file(file_path, data_to_log)

        await sleep(1000 * 1 * 1) // 1 min interval
    }
}
console.info(`Application started at ${date_time()}`)
main()
