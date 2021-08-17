<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

/**
 * Class ApiController
 *
 * @package App\Http\Controllers\Api
 */
class ApiController extends Controller
{
    /** @var array */
    protected array $data = [];

      /** @var bool */
    protected bool $isError = false;

    /** @var array */
    protected array $errorMessages = [];

    /**
     * @param $data
     *
     * @return JsonResponse
     */
    protected function successResponse($data): JsonResponse
    {
        $this->data = $data;

        return $this->buildResponse(Response::HTTP_OK);
    }

    /**
     * @param $code
     *
     * @return JsonResponse
     */
    protected function buildResponse($code): JsonResponse
    {
        $response = [
            'data' => $this->data,
            'isError' => $this->isError,
            'errorMessages' => $this->errorMessages,
        ];

        return response()->json($response, $code);
    }

    /**
     * @param  array  $messages
     *
     * @return JsonResponse
     */
    protected function userErrorResponse(array $messages): JsonResponse
    {
        $this->isError = true;
        $this->errorMessages = $messages;

        return $this->buildResponse(Response::HTTP_BAD_REQUEST);
    }
     
    //The server could not understand the request due to invalid syntax. error=400 

    /**
     * @return JsonResponse
     */
    protected function notFoundResponse($messages): JsonResponse
    {
        $this->isError = true;
        $this->errorMessages = $messages;
        return $this->buildResponse(Response::HTTP_NOT_FOUND);
    }
    //The server can not find the requested resource. In the browser, this means the URL is not recognized error=404

    /**
     * @return JsonResponse
     */
    public function unauthorizedResponse(array $messages) 
    {
        $this->isError = true;
        $this->errorMessages = $messages;
        return $this->buildResponse(Response::HTTP_UNAUTHORIZED);
    }
    // That is, the client must authenticate itself to get the requested response error=401

    /**
     * @return JsonResponse
     */
    protected function forbiddenResponse(): JsonResponse
    {
        return $this->buildResponse(Response::HTTP_FORBIDDEN);
    }
    //The client does not have access rights to the content; that is, it is unauthorized,
    // so the server is refusing to give the requested resource. 
    //Unlike 401, the client's identity is known to the server error=403

    /**
     * @param  array  $messages
     *
     * @return JsonResponse
     */
    protected function applicationErrorResponse(array $messages): JsonResponse
    {
        $this->isError = true;
        $this->errorMessages = $messages;

        return $this->buildResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    //The server has encountered a situation it doesn't know how to handle. error=500;


    public function readJsonFile() {

        $path = realpath('../../backend/database/jsonjohn/results.json');
        $result = json_decode(file_get_contents($path), true);

        function printArray($array){
            $newArray = [];
            foreach($array as $key => $value){
                if(is_array($value)){
                    $newArray[$key] = $value;
                    printArray($value);
                }else {
                    $newArray[$key] = $value;
                }
            }
            return $newArray;
        }

    $result = printArray($result);
    dd($result);
    //we need to read from json file 
}
}