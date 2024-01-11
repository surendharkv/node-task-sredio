import { Router } from 'express';
import { gitController } from '../../controllers';

const router = Router();

router.route('/url').get(gitController.getUrl);
router.route('/user').get(gitController.acquireUserInfo);
router.route('/token').post(gitController.acquireAccessToken);
router.route('/token').delete(gitController.removeIntegration);

export default router;

/**
 * @swagger
 * tags:
 *   name: Git
 *   description: Git OAuth flow
 */

/**
 * @swagger
 * /git/url:
 *   get:
 *     summary: Git Url
 *     description: Git URL for user's GitHub identity.
 *     tags: [Git]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/GitUrl'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /git/user:
 *   get:
 *     summary: Git User
 *     description: Get Github user details.
 *     tags: [Git]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/GitUser'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /git/token:
 *   post:
 *     summary: Add integration
 *     description: Create Github access token.
 *     tags: [Git]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Success'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /git/token:
 *   delete:
 *     summary: Remove integration
 *     description: Remove Github access token.
 *     tags: [Git]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Success'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
