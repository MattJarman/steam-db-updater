import Helper from '@App/modules/common/Helper'

jest.useFakeTimers()

describe('Helper', () => {
  it('constructs', () => {
    const helper = new Helper()
    expect(helper).toBeInstanceOf(Helper)
  })

  describe('.sleep()', () => {
    it('sleeps for the specified amount of time', async () => {
      const time = 1

      // eslint-disable-next-line jest/valid-expect-in-promise
      Promise.resolve().then(() => jest.advanceTimersByTime(time))

      await Helper.sleep(time)
      expect(setTimeout).toHaveBeenCalledTimes(1)
    })
  })
})
