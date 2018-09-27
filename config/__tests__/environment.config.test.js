'use strict'

const setEnvironment = require('../environment.config')
const { default_environment, environments } = require('../../consts/server')

describe('Environment Configuration', () => {
  const spy = jest.spyOn(global.console, "log").mockImplementation()
  afterAll(() => spy.mockRestore())
  describe('when no environment is input', () => {
    const result = setEnvironment()
    it(`should return ${default_environment}`, () => {
      expect(result).toEqual(environments[default_environment])
    })
    it(`should notify user of undefined input and that environment is set to ${default_environment}`, () => {
      expect(spy).toHaveBeenCalledWith(`Target Environment: undefined -- unspecified to ${default_environment}`)
    })
  })
  describe('when an invalid environment is input', () => {
    const result = setEnvironment({winnerWinner: "chicken dinner"})
    it(`should return ${default_environment}`, () => {
      expect(result).toEqual(environments[default_environment])
    })
    it(`should notify user of invalid input and that environment is set to ${default_environment}`, () => {
      expect(spy).toHaveBeenCalledWith(`Target Environment: invalid -- unspecified to ${default_environment}`)
    })
  })
  for(let environment in environments) {
    describe(`when \"${environment}\" is input`, () => {
      const result = setEnvironment(environment)
    it(`should return ${environment}`, () => {
      expect(result).toEqual(environments[environment])
    })
    it(`should notify user that environment is set to ${environment}`, () => {
      expect(spy).toHaveBeenCalledWith(`Target Environment: ${environment}`)
    })
    })
  }
})