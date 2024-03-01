<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    #[Route('/index', name: 'app_index')] // not sure why the manifest can't start on /
    public function index(): Response
    {
        return $this->render('noise-index.html.twig', [
        ]);
    }
}
