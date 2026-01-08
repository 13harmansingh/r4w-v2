
$products = @{
    "navy-tack-pant" = @(
        "https://framerusercontent.com/images/nh6WoW5ceB5GJiNvUEoSO5YfTxM.jpg",
        "https://framerusercontent.com/images/8K68DTMyrdOhOIScntLv9zKXIkw.jpg",
        "https://framerusercontent.com/images/KDussjfCMd7tlVfcccRih6L4cQ.jpg",
        "https://framerusercontent.com/images/R2csyj09gFyKWoIwIWWCUycTo.jpg"
    );
    "pink-hoodie" = @(
        "https://framerusercontent.com/images/x4HGbVpkAVuH670cVJYMzZZ2A.jpg",
        "https://framerusercontent.com/images/Po3VbcxZJSTLUDRqBs0DclCFDU.jpg",
        "https://framerusercontent.com/images/tSJDsgv6e1XUYx11OL8oPc8eA8.jpg"
    );
    "black-sweatshirt" = @(
        "https://framerusercontent.com/images/c576Bkq9CKkvk5GKXQ24IEUAeOg.jpg",
        "https://framerusercontent.com/images/obEoilIqqZIFyO3ZKdDbldqss.jpg",
        "https://framerusercontent.com/images/CxYIBPfEMfO8NtgPwLTpPFxFo0.jpg",
        "https://framerusercontent.com/images/FpkBUEkS4JrwhwHA8KzwKuklYs.jpg"
    );
    "grey-shorts" = @(
        "https://framerusercontent.com/images/Ty78ruoAY4fZfK3wnVlB72u9b6Y.jpg",
        "https://framerusercontent.com/images/xTAO2bSkK3cisJ7ij0tvvblZk.jpg",
        "https://framerusercontent.com/images/YjAPKeIB4kG2W3YEQSS3uKBlD1A.jpg"
    );
    "stone-hoodie" = @(
        "https://framerusercontent.com/images/JLDz59ZmAWXULSQTJRzWc2kUsO0.jpg",
        "https://framerusercontent.com/images/oPFrFbYJUKysMOoAkXkW3cO7us.jpg",
        "https://framerusercontent.com/images/KBHRIVXlvc1VS3fF4QPbdQHNIEI.jpg",
        "https://framerusercontent.com/images/hw6Wqt9tFGQkEXdo3BeMkaqMdnU.jpg"
    );
    "neon-track-pant" = @(
        "https://framerusercontent.com/images/xPLT9D9DtFaYsyMO3duEddbTHo.jpg",
        "https://framerusercontent.com/images/466uQ1kL4lwBHwRM9JwO444JLZA.jpg",
        "https://framerusercontent.com/images/xaizvLkBCePDQk5BAHRzZoVO9Q.jpg",
        "https://framerusercontent.com/images/5xSNJE2n5l7bEjE6z5dOEFlqQo8.jpg"
    );
    "windbreaker" = @(
        "https://framerusercontent.com/images/VhBmLMO9TMZleaFMxqAqv2topKE.jpg",
        "https://framerusercontent.com/images/ClfL9lU3cLOGvgSCUvf4xumaY.jpg",
        "https://framerusercontent.com/images/UBifyZhrFywEgDPXKFSuaNnAFM.jpg",
        "https://framerusercontent.com/images/8oiE9EoxxntM5Nw7Pf6yIt3wwM.jpg"
    );
    "green-tee" = @(
        "https://framerusercontent.com/images/yLUch5K9y4bCZyxTAwHcuhAisY.jpg",
        "https://framerusercontent.com/images/lkr0KcNFjdjOK7M0imAMe6BgE.jpg",
        "https://framerusercontent.com/images/lrmBB5bX5DL7WvnF6TrzGOj18kM.jpg",
        "https://framerusercontent.com/images/JKu8ZIyhiXFhM4VjGdwsPyoLp5U.jpg"
    );
    "blue-shorts" = @(
        "https://framerusercontent.com/images/RMWaDacL3zeX0wi6K3WDHgwCqA.jpg",
        "https://framerusercontent.com/images/X8cLWvP5pvdAp8KrlsPXlAFek.jpg",
        "https://framerusercontent.com/images/sAGPmMAUTu0Xf4hOh6IdtzEGFg8.jpg",
        "https://framerusercontent.com/images/sQ73z2FxGGRdLaPC4NgnfX8.jpg"
    )
}

$destDir = "public/images/products"
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

foreach ($slug in $products.Keys) {
    $urls = $products[$slug]
    $i = 1
    foreach ($url in $urls) {
        $filename = "$slug-$i.jpg"
        $path = Join-Path $destDir $filename
        Write-Host "Downloading $filename..."
        try {
            Invoke-WebRequest -Uri $url -OutFile $path
        } catch {
            Write-Error "Failed to download $url"
        }
        $i++
    }
}
Write-Host "Done."
