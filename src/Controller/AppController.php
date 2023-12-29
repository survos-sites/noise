<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    #[Route('/index.html', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('noise-index.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }
}
