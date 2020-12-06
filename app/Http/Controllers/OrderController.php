<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Stripe\Charge;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// Set your secret key. Remember to switch to your live secret key in production!
		// See your keys here: https://dashboard.stripe.com/account/apikeys
		\Stripe\Stripe::setApiKey('sk_test_fvYVXcTxZMYsXqsy7fK7VLOH003D2eLbhf');

		$intent = \Stripe\PaymentIntent::create([
			'amount' => $request->price,
			'currency' => 'eur',
			// Verify your integration in this guide by including this parameter
			'metadata' => ['integration_check' => 'accept_a_payment'],
		]);

		try {
			Charge::create([
				"amount" => $request->price,
				"currency" => "eur",
				"source" => $request->stripeToken,
				"description" => "Charge for " . auth()->user()->email,
			]);
			Order::create([
				'service' => $request->service,
				'tier' => $request->tier,
				'division' => $request->division,
				'server' => request('server'),
				'wins' => $request->wins,
				'queue' => $request->queue,
				'client_id' => auth()->id(),
				'options' => $request->options,
				'price' => $request->price,
			]);
			return response([
				'message' => __('Your order has been placed'),
			]);
		} catch (\Exception $ex) {
			logger()->error($ex->getMessage());
			return response([
				'error' => __('Purchase failed!'),
			], 402);
		}
	}
}
