import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {
  public async index({ response }: HttpContextContract) {
    try {
      const result = await Customer.all()
      return response.ok({
        code: 200,
        status: 'ok',
        messages: 'get list all customer successfully',
        data: result,
      })
    } catch (error) {
      return response.internalServerError({ code: 500, status: 'error', message: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const req = request.only(['name', 'email'])

    try {
      const result = await Customer.create(req)

      return response.created({
        code: 201,
        status: 'created',
        messages: 'create customer successfully',
        data: result,
      })
    } catch (error) {
      return response.internalServerError({ code: 500, status: 'error', message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const users = await Customer.findBy('id', params.id)

      return response.ok({
        code: 200,
        status: 'success',
        messages: 'get spesific customer successfully',
        data: users,
      })
    } catch (error) {
      return response.internalServerError({ code: 500, status: 'error', message: error.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['name', 'email'])
    try {
      const users = await Customer.findBy('id', params.id)
      users?.merge(input)

      await users?.save()

      return response.ok({
        code: 200,
        status: 'success',
        messages: 'update customer successfully',
        data: users,
      })
    } catch (error) {
      return response.internalServerError({ code: 500, status: 'error', message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const users = await Customer.findBy('id', params.id)
      await users?.delete()

      return response.ok({
        code: 200,
        status: 'success',
        messages: 'delete customer successfully',
        data: users,
      })
    } catch (error) {
      return response.internalServerError({ code: 500, status: 'error', message: error.message })
    }
  }
}
