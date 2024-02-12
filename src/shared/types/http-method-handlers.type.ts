import { HTTPMethodHandler } from './http-method-handler.type'
import { HTTPMethods } from './http-methods.type'

export type HTTPMethodHandlers = Record<string, Partial<Record<HTTPMethods, HTTPMethodHandler>>>
