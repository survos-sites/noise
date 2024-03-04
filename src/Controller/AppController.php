<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    #[Route('/index', name: 'app_index')] // not sure why the manifest can't start on /
    public function home(): Response
    {
        return $this->render('noise-index.html.twig', [
        ]);
    }

    #[Route('/about', name: 'app_about')] // not sure why the manifest can't start on /
    public function about(): Response
    {
        return $this->render('about.html.twig', [
        ]);
    }
    #[Route('/howler', name: 'app_howler')] // not sure why the manifest can't start on /
    public function howler(): Response
    {
        return $this->render('howler.html.twig', [
        ]);
    }

}
