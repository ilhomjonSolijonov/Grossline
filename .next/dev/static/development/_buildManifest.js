self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/css/:path*",
        "destination": "/mirror/css/:path*"
      },
      {
        "source": "/js/:path*",
        "destination": "/mirror/js/:path*"
      },
      {
        "source": "/images/:path*",
        "destination": "/mirror/images/:path*"
      },
      {
        "source": "/fonts/:path*",
        "destination": "/mirror/fonts/:path*"
      },
      {
        "source": "/ru",
        "destination": "/mirror/index.html"
      },
      {
        "source": "/ru/:slug",
        "destination": "/mirror/:slug.html"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()