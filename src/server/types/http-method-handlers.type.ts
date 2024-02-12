import { HTTPMethods } from '../../shared/types/http-methods.type'
import { MethodHandler } from './method-handler.type'

export type HTTPMethodHandlers = Record<string, Partial<Record<HTTPMethods, MethodHandler>>>
