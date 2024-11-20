// Importamos el módulo express
const express = require("express")

// Creamos una nueva instancia del Router de express para manejar las rutas
const router = express.Router()

const {validatorCreateWeb, validatorGetWeb, validatorUpdateWeb, validatorDeleteWeb, validatorRestoreWeb, validatorAddImage, validatorAddText, validatorAddReview} = require("../validators/web")

// Importamos los controladores (funciones) que contienen la lógica para cada acción relacionada con el esquema 'web'
const {getWebs, getWeb, createWeb, updateWeb, restoreWeb, deleteWeb, addImage, addImageMemory, addText, searchWebs, addReview} = require("../controllers/web")

// Importamos la función que nos permite guardar la imagen en el server para subir la url a la db
const { uploadMiddleware, uploadMiddlewareMemory } = require("../utils/handleStorage")

const { bizMiddleware, authMiddleware } = require("../middleware/session")
const { checkBiz } = require("../middleware/rol")


/**
 * @openapi
 * /api/web:
 *  get:
 *      tags:
 *      - Web
 *      summary: Get all webs
 *      description: Returns all webs registered in the database
 *      responses:
 *          '200':
 *              description: Successfully returned the list of webs
 *          '404':
 *              description: No webs found
 *          '500':
 *              description: Server error
 */
router.get("/", getWebs)

/**
 * @openapi
 * /api/web/{cif}:
 *  get:
 *      tags:
 *      - Web
 *      summary: Get a web by CIF
 *      description: Returns web data by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to retrieve
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successfully returned the web
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 */
router.get("/:cif", validatorGetWeb, getWeb)

/**
 * @openapi
 * /api/web/search/{city}/{activity}:
 *  get:
 *      tags:
 *      - Web
 *      summary: Search webs by city and activity
 *      description: Returns a list of webs filtered by city and activity, with optional sorting by scoring.
 *      parameters:
 *          - name: city
 *            in: path
 *            description: City to filter the webs
 *            required: true
 *            schema:
 *              type: string
 *          - name: activity
 *            in: path
 *            description: Activity to filter the webs
 *            required: true
 *            schema:
 *              type: string
 *          - name: upwards
 *            in: query
 *            description: Sort order for scoring. Set to "true" for descending (high to low) or "false" for ascending (low to high).
 *            required: false
 *            schema:
 *              type: string
 *              enum: ["true", "false"]
 *          - name: sortByScoring
 *            in: query
 *            description: Flag to indicate if results should be sorted by scoring
 *            required: false
 *            schema:
 *              type: boolean
 *      responses:
 *          '200':
 *              description: Successfully returned filtered and sorted webs
 *          '400':
 *              description: Invalid query parameters (e.g., incorrect 'upwards' value)
 *          '404':
 *              description: No webs found for the specified city and activity
 *          '500':
 *              description: Server error
 */

router.get("/search/:city/:activity", searchWebs)

/**
 * @openapi
 * /api/web:
 *  post:
 *      tags:
 *      - Web
 *      summary: Create a new web
 *      description: Creates a new web with the provided data
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Successfully created the web
 *          '400':
 *              description: Already existing business with a web
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", bizMiddleware, validatorCreateWeb, createWeb)

/**
 * @openapi
 * /api/web/{cif}:
 *  put:
 *      tags:
 *      - Web
 *      summary: Update a web
 *      description: Updates web data by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to update
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Successfully updated the web
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:cif", bizMiddleware, checkBiz, validatorUpdateWeb, updateWeb)

/**
 * @openapi
 * /api/web/restore/{cif}:
 *  put:
 *      tags:
 *      - Web
 *      summary: Restore a web
 *      description: Restores a logically deleted web by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to restore
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successfully restored the web
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/restore/:cif", bizMiddleware, checkBiz, validatorRestoreWeb, restoreWeb)

/**
 * @openapi
 * /api/web/addimage/{cif}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Add an image to a web
 *      description: Adds an image to the image array of the specified web by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to which the image will be added
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          '200':
 *              description: Successfully added the image
 *          '400':
 *              description: Already existing image in db
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/addimage/:cif", bizMiddleware, checkBiz, validatorAddImage, uploadMiddleware.single("image"), addImage)

/**
 * @openapi
 * /api/web/memory/addimage/{cif}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Add an image to a web
 *      description: Adds an image to the image array of the specified web by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to which the image will be added
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          '200':
 *              description: Successfully added the image
 *          '400':
 *              description: Already existing image in db
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/memory/addimage/:cif", bizMiddleware, checkBiz, validatorAddImage, uploadMiddlewareMemory.single("image"), addImageMemory)



/**
 * @openapi
 * /api/web/addtext/{cif}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Add a text to a web
 *      description: Adds a text to the text array of the specified web by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to which the text will be added
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          textArray:
 *                              type: string
 *                              example: "The restaurant you have always been waiting for!"
 *      responses:
 *          '200':
 *              description: Successfully added the text
 *          '400':
 *              description: Already existing text in db
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */

router.patch("/addtext/:cif", bizMiddleware, checkBiz, validatorAddText, addText)



/**
 * @openapi
 * /api/web/addreview/{cif}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Add a review to a web
 *      description: Adds a review with scoring and text to the specified web by its CIF
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to which the review will be added
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          scoring:
 *                              type: integer
 *                              minimum: 1
 *                              maximum: 5
 *                              example: 4
 *                          reviewText:
 *                              type: string
 *                              example: "Excelent service and fantastic food."
 *      responses:
 *          '200':
 *              description: Successfully added the review
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/addreview/:cif", authMiddleware, validatorAddReview, addReview);
/**
 * @openapi
 * /api/web/{cif}:
 *  delete:
 *      tags:
 *      - Web
 *      summary: Delete a web
 *      description: Deletes a web by its CIF, either physically or logically
 *      parameters:
 *          - name: cif
 *            in: path
 *            description: CIF of the web to delete
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successfully deleted the web
 *          '403':
 *              description: Validation error
 *          '404':
 *              description: Web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:cif", bizMiddleware, checkBiz, validatorDeleteWeb, deleteWeb)

// Exportamos el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router
