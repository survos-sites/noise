<?php

namespace App\Controller;

use Survos\PwaExtraBundle\Attribute\PwaExtra;
use Survos\PwaExtraBundle\Service\PwaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[PwaExtra(cacheStrategy: PwaService::NetworkFirst)]
class AppController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    #[Route('/index', name: 'app_index')] // not sure why the manifest can't start on /
    public function home(): Response
    {
        return $this->render('noise-index.html.twig', [
        ]);
    }

    #[Route('/pages/tos', name: 'app_terms_of_service')]
    public function tos(): Response
    {
        return $this->render('app/tos.html.twig', [
        ]);
    }

    #[Route('/about', name: 'app_about')] // not sure why the manifest can't start on /'#[PwaExtra(cacheStrategy: 'CacheOnly')]
    #[PwaExtra(cacheStrategy: PwaService::CacheOnly)]
    public function about(PwaService $pwaService): Response
    {

        $workbox = $pwaService->getWorkbox();
        foreach ($workbox as $var=>$val) {
            if (is_object($val)) {
                $name = $val::class;
                if (str_ends_with($name, 'Cache')) {
                    $cache[] = (array)$val + ['name' => (new \ReflectionClass($name))->getShortName()];
                }
            }
        }

        return $this->render('about.html.twig', [
            'cacheData' => $cache
        ]);
    }
    #[Route('/howler', name: 'app_howler')] // not sure why the manifest can't start on /
    public function howler(): Response
    {
        return $this->render('howler.html.twig', [
        ]);
    }

}
