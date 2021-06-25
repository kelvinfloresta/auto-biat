export abstract class ProcessHandler {
  private stopped = true
  private promiseRunning: Promise<void> = Promise.resolve()

  constructor (private watcherName: string) {}

  protected async start (): Promise<void> {
    if (!this.stopped) {
      return console.log(`Watcher ${this.watcherName} already started`)
    }

    this.stopped = false
    console.log(`Starting ${this.watcherName}`)
    this.promiseRunning = this.handleProcess()
  }

  private async handleProcess (): Promise<void> {
    await this.process()
    if (this.stopped) {
      return
    }
    return this.handleProcess()
  }

  protected abstract process (): Promise<void>

  protected async stop () {
    this.stopped = true
    await this.promiseRunning
  }
}
