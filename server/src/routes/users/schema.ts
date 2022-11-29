import Joi from 'joi';
import faker from '@faker-js/faker';
import { EndpointSchema } from '../../interfaces';
import { buildResponse, schemaErrorExample } from '../../utils/schemaResponseExamples';
import { getArrayResponseExample } from '../../utils/schema';
import { RESPONSE_CODE } from '../../constants';
import { MAX_TIME_VARIATION, MIN_TIME_VARIATION } from '../../constants/users';

const getUsersSchema: EndpointSchema = {
  query: Joi.object({
    id: Joi.array().items(Joi.string().uuid()),
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
  }).example({
    id: faker.datatype.uuid(),
    limit: 10,
    offset: 0,
  }),
  response: {
    200: {
      schema: getArrayResponseExample(
        Joi.object({
          id: Joi.string().uuid(),
          name: Joi.string(),
        }),
        {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
        },
      ),
      swaggerOptions: {
        description: 'Get users',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};
const getUsersBaseSchema: EndpointSchema = {
  query: Joi.object({
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
    role: Joi.string().equal('all', 'manager', 'employee', 'top').optional(),
    searchTerm: Joi.string().optional(),
  }).example({
    limit: 10,
    offset: 0,
    role: 'Manager',
    searchTerm: 'admin user',
  }),
  response: {
    200: {
      schema: getArrayResponseExample(
        Joi.object({
          id: Joi.string().uuid(),
          name: Joi.string(),
          surname: Joi.string(),
          email: Joi.string(),
          role: Joi.string(),
          managerName: Joi.string(),
        }),
        {
          id: faker.datatype.uuid(),
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          email: faker.internet.email(),
          role: faker.random.word(),
          managerName: faker.name.firstName(),
        },
      ),
      swaggerOptions: {
        description: 'Get users base',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const usersDatabaseSearchSchema: EndpointSchema = {
  query: Joi.object({
    searchString: Joi.string(),
  }).example({
    searchString: 'dmin user',
  }),
  response: {
    200: {
      schema: getArrayResponseExample(
        Joi.object({
          userId: Joi.string().uuid(),
          name: Joi.string(),
          surname: Joi.string(),
        }),
        {
          id: faker.datatype.uuid(),
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
        },
      ),
      swaggerOptions: {
        description: 'Users database search',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const getUserSchema: EndpointSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string(),
      })
        .example({
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
        })
        .allow(null),
      swaggerOptions: {
        description: 'Get user',
      },
    },

    404: buildResponse(schemaErrorExample.notFound()),
    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const createUserSchema: EndpointSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).example({
    name: faker.name.findName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }),

  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string(),
      }).example({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
      }),
      swaggerOptions: {
        description: 'Create user',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const updateUserSchema: EndpointSchema = {
  body: Joi.object({
    id: Joi.string().uuid(),
    name: Joi.string(),
    surname: Joi.string(),
    birthDate: Joi.date(),
    startingDate: Joi.date(),
    phoneNumber: Joi.string(),
    contactInfo: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
  }).example({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    surname: faker.name.lastName(),
    birthDate: faker.date.soon(),
    startingDate: faker.date.future(),
    phoneNumber: faker.phone.phoneNumber('############'),
    contactInfo: faker.name.firstName(),
    country: faker.name.firstName(),
    city: faker.name.firstName(),
  }),

  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string(),
        birthDate: Joi.string(),
        startingDate: Joi.date(),
        phoneNumber: Joi.string(),
        contactInfo: Joi.string(),
      }).example({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        birthDate: faker.date.soon(),
        startingDate: faker.date.future(),
        phoneNumber: faker.phone.phoneNumber('############'),
        contactInfo: faker.name.firstName(),
      }),
      swaggerOptions: {
        description: 'Update user',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const loginUserSchema: EndpointSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    timeZone: Joi.number().max(MAX_TIME_VARIATION).min(MIN_TIME_VARIATION),
  }).example({
    email: faker.internet.email(),
    password: faker.internet.password(),
    timeZone: faker.datatype.number({ min: MIN_TIME_VARIATION, max: MAX_TIME_VARIATION }),
  }),

  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string(),
      }).example({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
      }),
      swaggerOptions: {
        description: 'Login user',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

export default {
  getUsers: getUsersSchema,
  getUsersBase: getUsersBaseSchema,
  usersDatabaseSearch: usersDatabaseSearchSchema,
  getUser: getUserSchema,
  createUser: createUserSchema,
  loginUser: loginUserSchema,
  updateUser: updateUserSchema,
};
