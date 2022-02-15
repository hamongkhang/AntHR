<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Combine firstname and lastname
     *
     * @param Request $request
     * @return \Illuminate\Http\Response|string
     */
        /**
     * @SWG\Get(
     *     path="/api/create",
     *     description="Return a user's first and last name",
     *     @SWG\Parameter(
     *         name="firstname",
     *         in="query",
     *         type="string",
     *         description="Your first name",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="lastname",
     *         in="query",
     *         type="string",
     *         description="Your last name",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */

    public function create(Request $request)
    {
        $userData = $request->only([
            'firstname',
            'lastname',
        ]);
        if (empty($userData['firstname']) && empty($userData['lastname'])) {
            return new \Exception('Missing data', 404);
        }
        return $userData['firstname'] . ' ' . $userData['lastname'];
    }
}
