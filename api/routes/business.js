// Importamos el módulo express
const express = require("express")

// Creamos una nueva instancia del Router de express para manejar las rutas de manera modular
const router = express.Router()

const { validatorCreateBiz, validatorGetBiz, validatorUpdateBiz, validatorDeleteBiz, validatorRestoreBiz, validatorMail } = require("../validators/business")

// Importamos los controladores (funciones) que contienen la lógica para cada acción relacionada con el esquema 'business'
const { getBizs, getBiz, createBiz, updateBiz, restoreBiz, deleteBiz, getUsers, sendMail } = require("../controllers/business")

const {authMiddleware, bizMiddleware, universalAuthMiddleware} = require("../middleware/session")

const { checkRol, checkBiz, checkBizOrAdmin } = require("../middleware/rol")

/**
 * @openapi
 * /api/business:
 *  get:
 *      tags:
 *      - Business
 *      summary: Get all businesses
 *      description: Returns all businesses registered in the system
 *      responses:
 *          '200':
 *              description: Successfully returned the list of businesses
 *          '404':
 *              description: No businesses found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", authMiddleware, checkRol(["admin"]), getBizs)

/**
 * @openapi
 * /api/business/users:
 *  get:
 *      tags:
 *      - Business
 *      summary: Get users email
 *      description: Returns all users that are open to offers
 *      responses:
 *          '200':
 *              description: Successfully returned the list of emails
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/users", bizMiddleware, getUsers)

/**
 * @openapi
 * /api/business/{cif}:
 *  get:
 *      tags:
 *      - Business
 *      summary: Get a business by CIF
 *      description: Returns business data by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the business to retrieve
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successfully returned the business
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Business not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/:cif", authMiddleware, checkRol(["admin"]), validatorGetBiz, getBiz)

/**
 * @openapi
 * /api/business:
 *  post:
 *      tags:
 *      - Business
 *      summary: Create a new business
 *      description: Creates a new business with the provided data
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/business"
 *      responses:
 *          '200':
 *              description: Successfully created the business
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateBiz, createBiz)


router.post("/mail", bizMiddleware, validatorMail, sendMail)
/**
 * @openapi
 * /api/business/{cif}:
 *  put:
 *      tags:
 *      - Business
 *      summary: Update a business
 *      description: Updates business data by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the business to update
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/business"
 *      responses:
 *          '200':
 *              description: Successfully updated the business
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Business not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:cif", bizMiddleware, checkBiz, validatorUpdateBiz, updateBiz)

/**
 * @openapi
 * /api/business/restore/{cif}:
 *  put:
 *      tags:
 *      - Business
 *      summary: Restore a business
 *      description: Restores a logically deleted business by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the business to restore
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successfully restored the business
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Business not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/restore/:cif", authMiddleware, checkRol(["admin"]), validatorRestoreBiz, restoreBiz)

/**
 * @openapi
 * /api/business/{cif}:
 *  delete:
 *      tags:
 *      - Business
 *      summary: Delete a business
 *      description: Deletes a business by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the business to delete
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successfully deleted the business
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Business not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:cif", universalAuthMiddleware, checkBizOrAdmin(['admin']), validatorDeleteBiz, deleteBiz)

// Exportamos el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router
