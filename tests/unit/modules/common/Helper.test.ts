import Helper from '@App/modules/common/Helper'

jest.useFakeTimers()

describe('Helper', () => {
  describe('.sleep()', () => {
    it('sleeps for the specified amount of time', async () => {
      const time = 1

      Promise.resolve().then(() => jest.advanceTimersByTime(time))
      await Helper.sleep(time)
      expect(setTimeout).toHaveBeenCalledTimes(1)
    })
  })
})
