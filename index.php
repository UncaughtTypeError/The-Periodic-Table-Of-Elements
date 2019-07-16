<!DOCTYPE html>

<html>
    <head>
        <!-- Title -->
        <title>The Periodic Table Of Elements</title>

        <!-- Meta Tags -->
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        
        <!-- Favicon -->
        <link rel="shortcut icon" href="/periodictable-favicon.png" type="image/x-icon">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
        <link rel="canonical" href="https://periodictableofchemicalelements.com">

        <meta name="description" content="The Period Table Of Elements">
        <meta name="robots" content="index,follow">
        <meta property="og:locale" content="en_GB">
        <meta property="og:type" content="website">
        <meta property="og:title" content="The Periodic Table Of Elements">

        <script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-86892505-1', 'auto');
		  ga('send', 'pageview');

		</script>
        <style>
        .opl {
            position:fixed;
            bottom:0px;
            left:0px;
            z-index:99999;
        }

        .opl a {
            width:73px;
            height:56px;
            text-indent:-9999px;
            display:block;
            background:url('https://s3.amazonaws.com/onepagelove/one-page-love-award-left.png') no-repeat;
        }

        * {
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
        }

        body {
            margin: 0px;
            width: 100%;
            background: white;
            font-family: Arial;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        footer {    
            padding: 10px;
            box-sizing: border-box;    
            border-top: 1px solid #e2e2e2;
            border-bottom: 1px solid #e2e2e2;
            color: #949494;
            text-align: center;
            font-size: 12px;
            position: relative;
            background: whitesmoke;
        }

        footer a {
            color: #949494;
        }

        html {
            width: 100%;
        }

        a {
            transition: .7s;
            color: #03a3ea;
        }

        a:hover {
            color: #949494;
        }

        sub {
            font-size: 10px;
        }

        .group:before {
            content: "";
            border-left: 0px solid transparent;
            border-bottom: 100px solid rgba(0,0,0,0.1);
            border-right: 50px solid transparent;
            border-top: 0px solid transparent;
            z-index: 0;
            position: absolute;
            left: -100px;
            top: 0px;
            width: auto;
            height: auto;
            padding-left: 50px;
            transition: .3s;
        }

        .group:hover:before, 
        .focus-group:before {
            left: 0px;
        }

        .group.focus-group:after {
            bottom: -10px;
        }

        .group:after {
            content: "";
            width: 0px;
            height: 0px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid transparent;
            position: absolute;
            bottom: 0px;
            left: 0;
            right: 0;
            margin: auto;
            transition: .7s;
            z-index: 2;
        }

        [class*="threat"].group .atomic-mass:after {
            content: "\f071";
            font-family: Font Awesome\ 5 Free;
            font-weight: 600;
            position: absolute;
            right: 3px;
            bottom: 3px;
            z-index: 8;
            transition: .5s;
            opacity: 0;
        }

        [class*="threat"].active-group .atomic-mass:after {
            opacity: 1;
        }

        [class*="threat"].group .atomic-mass:before {
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            border-left: 0px solid transparent;
            border-bottom: 0px solid #ffffff;
            z-index: 8;
            transition: .5s;
            opacity: 0;
        }

        [class*="threat"].active-group .atomic-mass:before {
            border-left: 30px solid transparent;
            border-bottom: 30px solid #ffffff;
            opacity: 1;
        }

        .threat-limited.active-group .atomic-mass:after {
            color: #ded014;
        }

        .threat-rising.active-group .atomic-mass:after {
            color: #e27807;
        }

        .threat-serious.active-group .atomic-mass:after {
            color: #d00000;
        }

        .wrapper {
            transition: .7s;
            position: relative;
        }

        .wrapper[class*="threat"]:before {
            content: "Endangered Element";
            position: absolute;
            color: #9a9a9a;
            top: 5px;
            left: 65px;
            font-size: 12px;
        }

        .wrapper[class*="threat"] .wrapper-inner:after {
            content: "\f071";
            font-family: Font Awesome\ 5 Free;
            font-weight: 600;
            position: absolute;
            left: 10px;
            top: 15px;
            color: white;
            z-index: 8;
        }

        .wrapper[class*="threat"] .wrapper-inner:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            border-right: 70px solid transparent;
            z-index: 8;
        }

        .wrapper.threat-limited .wrapper-inner:before {
            border-top: 70px solid #ded014;
        }

        .wrapper.threat-rising .wrapper-inner:before {
            border-top: 70px solid #e27807;
        }

        .wrapper.threat-serious .wrapper-inner:before {
            border-top: 70px solid #d00000;
        }

        .info-loader {
            position: absolute;
            display: block;
            margin: auto;
            width: 50px;
            height: 50px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9;
            font-size: 50px;
            color: #bbbbbb;
            -webkit-animation: spin 1s infinite linear;
            -moz-animation: spin 1s infinite linear;
            -o-animation: spin 1s infinite linear;
            animation: spin 1s infinite linear;
        }

        .info-loader-overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            z-index: 9;
            background: rgba(255, 255, 255, 0.8);
        }

        .info {
            position: relative;
        }

        .info .close {
            background: whitesmoke;
            border-radius: 100%;
            border: 2px solid #bbbbbb;
            width: 30px;
            height: 30px;
            position: absolute;
            right: 20px;
            top: 20px;
            color: #bbbbbb;
            cursor: pointer;
            font-weight: bold;
            transition: .7s;
            text-align: center;
            vertical-align: text-bottom;
            line-height: 30px;
            z-index: 1;
            font-size: 0;
        }

        .info .close:after {
            content: "\d7";
            font-size: 25px;
        }

        .info .close:hover {
            color: #ef2929;
            border: 2px solid #ef2929;
        }

        .focus {
            transform: scale(1.2, 1.2);
            z-index: 9;
            position: relative;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 30px 5px inset !important;
        }

        div.no-focus, div.no-focus .group {
            background: #e0e0e0;
            color: darkgray;
        }

        .no-focus .atomic-number:before {
            color: darkgray !important;
        }

        .bottom {
            margin-top: 10px;
        }

        .array {
            box-sizing: border-box;
            padding: 20px;
        }

        .group {
            max-width: 107px;
            min-height: 103px;
            max-height: 103px;
            border-collapse: collapse;
            border: 1px solid white;
            float: left;
            display: inline-block;
            box-sizing: border-box;
            padding: 10px;
            font-family: arial;
            width: 7%;
            flex: 1 1;
            display: flex;
            flex-direction: column;
            position: relative;
            transition: .7s;
            transform-origin: center;    
            box-shadow: none;
            overflow: hidden;
        }

        .group:hover {
            transform: scale(1.5, 1.5);
            z-index: 9;
            position: relative;
            cursor: url(/img/cursor-help.png), auto;
        }

        .group:hover:after {
            bottom: 10px !important;
            border-top: 10px solid transparent !important;
        }

        .focus-group {
            border: 1px dashed #545454;
        }

        .group.no-focus:hover {
            color: black !important;
        }

        .group.no-focus.focus-group:after {
            border-top-color: #e0e0e0;
        }

        .group:first-of-type {
            transform-origin: left;
        }

        .group:last-of-type {
            transform-origin: right;
        }

        .period:first-of-type .group:last-of-type {
            transform-origin: right top;
        }

        .period:first-of-type .group:first-of-type {
            transform-origin: left top;
        }

        .group.empty {
            border-color: transparent;
            pointer-events: none;
        }

        .group.empty:hover {
            transform: scale(1);
            z-index: 1;
            box-shadow: none;
        }

        .other-nonmetals, .other-nonmetals.no-focus:hover  {
            background: #76FF03;
        }

        .noble-gases, .noble-gases.no-focus:hover  {
            background: #df5ff5;
        }

        .halogens, .halogens.no-focus:hover  {
            background: #18FFFF;
        }

        .metalloids, .metalloids.no-focus:hover  {
            background: #00E676;
        }

        .alkaline-earth-metals, .alkaline-earth-metals.no-focus:hover  {
            background: #eaea18;
        }

        .alkali-metals, .alkali-metals.no-focus:hover  {
            background: #f7a91d;
        }

        .transition-metals, .transition-metals.no-focus:hover  {
            background: #ff3e7f;
        }

        .post-transition-metals, .post-transition-metals.no-focus:hover  {
            background: #40C4FF;
        }

        .lanthanoids, .lanthanoids.no-focus:hover  {
            background: #fd6d3f;
        }

        .actinoids, .actinoids.no-focus:hover  {
            background: #ff1744;
        }

        #six .lanthanoids, #seven .actinoids {
            justify-content: center;
        }

        #six .lanthanoids .atomic-number, #seven .actinoids .atomic-number {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .element-symbol {
            font-size: 1.5em;
        }

        .atomic-number {
            font-size: 1.2em;
        }

        .atomic-orbital-shells {
            float: right;
            font-size: 10px;
            display: flex;
            flex-direction: column;
            flex: 0;
            position: absolute;
            right: 10px;
        }

        .atomic-orbital-shells span {
            display: block;
            text-align: right;
            line-height: 10px;
        }

        .element-name, .atomic-mass {
            font-size: 11px;
            flex: 1 1;
            align-items: flex-end;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: inline-block;
            max-width: 85%;
        }

        .period {
            display: block;
            clear: both;
            display: flex;
            justify-content: space-around;
            align-items: stretch;
        }

        .break {
            height: 30px;
        }

        .category .active:after {
            content: "";
            width: 5px;
            height: 5px;
            background: #00c300;
            border: 2px solid white;
            transition: .7s;
        }

        .category div:after {
            content: "";
            width: 0px;
            height: 0px;
            border: 3px solid transparent;
            transition: .7s;
            position: absolute;
            display: block;
            border-radius: 100%;
            margin: auto;
            background: transparent;
            right: 3px;
            bottom: 2px;
        }

        .category {
            display: flex;
            justify-content: center;
            position: absolute;
            right: 0;
            left: 0;
            font-family: arial;
        }

        .category div {
            padding: 10px;
            box-sizing: border-box;
            border: 1px solid white;
            z-index: 9;
            transition: .7s;
            transform-origin: top;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .category div:hover {
            transform: scale(1.2, 1.2);
            z-index: 10;
        }

        .category div:before {
            content: "";
            border-left: 0px solid transparent;
            border-bottom: 100px solid rgba(0,0,0,0.1);
            border-right: 50px solid transparent;
            border-top: 0px solid transparent;
            z-index: 0;
            position: absolute;
            left: -100px;
            top: 0px;
            width: auto;
            height: auto;
            padding-left: 50px;
            transition: .3s;
        }

        .category div:hover:before {
            left: 0px;
        }

        #one .group:first-child,#one .group:last-child {
            z-index: 2;
            position: relative;
        }

        .characteristic {
            display: flex;
            justify-content: center;
            position: absolute;
            right: 0;
            left: 0;
            top: 50px;
            z-index: 1;
            font-family: arial;
            justify-content: space-between;    
            width: 100%;
            margin: auto;
            max-width: 1245px;
        }

        .characteristic .non-metals {
            flex: 0 28%;
            max-width: 345px;
        }

        .characteristic div {
            text-align: center;
            padding: 5.5px 0px;
            box-sizing: border-box;
            position: relative;
            border: 2px solid #e2e2e2;
            border-top: 0px;
            justify-content: center;
            display: flex;
        }

        .characteristic div span {
            position: absolute;
            left: auto;
            right: auto;
            background: white;
            width: auto;
            padding: 5px;
            box-sizing: border-box;
            top: 0;
            color: #545454;
        }

        .characteristic .metals {
            flex: 0 65%;
            max-width: 804px;
        }

        .card .element-name {
            text-overflow: initial;
            max-width: none;
        }

        .card.overview p:before {
            font-family: Font Awesome\ 5 Free;
            font-weight: 900;
            margin-right: 10px;
            color: #545454;
        }

        .card.overview p:nth-of-type(3):before {
            content: "\f1da";
        }

        .card.overview p:nth-of-type(2):before {
            content: "\f2cb";
        }

        .card.overview p:nth-of-type(1):before {
            content: "\f0c3";
        }

        .card .endangered div[class*="threat"] [class*="fa"]:not(.fa-xs) {
            font-size: 20px;
        }

        .card .endangered {
            margin-bottom: 0;
            margin-top: 15px;
            font-size: 12px;
            border-top: 1px solid #e2e2e2;
            padding-top: 15px;
        }

        .card .endangered:after,
        .card .endangered:before {
            display: none;
        }

        .card .endangered div[class*="threat"] sup {
            left: 20px;
            top: -5px;
            font-size: 8px;
        }

        .card .endangered div[class*="threat"] {
            justify-content: flex-start;
        }

        .card .endangered div[class*="threat"] span:first-of-type {
            margin-right: 12px;
        }

        div#lanthanide-series .group:nth-child(2):after {
            content: "Ln Series";
        }

        div#actinide-series .group:nth-child(2):after {
            content: "An Series";
        }

        div#lanthanide-series .group:nth-child(2):after, div#actinide-series .group:nth-child(2):after {
            display: block;
            border: 0px;
            width: auto;
            height: auto;
            left: auto;
            right: 10px;
            top: 0;
            color: #545454;
        }

        div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
            display: none;
        }

        .endangered {
            text-align: center;
            vertical-align: middle;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 85px 0 30px 0;
            color: #545454;
            position: relative;
        }

        .endangered:before {
            content: "Endangered Elements";
            position: absolute;
            top: -50px;
            text-align: center;
            left: 0;
            right: 0;
            width: 180px;
            margin: auto;
            display: block;
            background: white;
            z-index: 8;
        }

        .endangered:after {
            content: "";
            width: 85%;
            height: 10px;
            display: block;
            margin: auto;
            left: 0;
            right: 0;
            top: -45px;
            position: absolute;
            border: 2px solid #e2e2e2;
            border-bottom: 0;
        }

        .endangered div[class*="threat"] {
            display: inline-block;
            flex: 1 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: .5s;
            border: 1px solid transparent;
        }

        .endangered div[class*="threat"]:hover span:first-of-type,
        .endangered div[class*="threat"].active span:first-of-type {
            transform: scale(1.15);
            transform-origin: left;
        }

        .endangered div[class*="threat"] span {
            transition: .5s;
        }

        .endangered div[class*="threat"]:hover,
        .endangered div[class*="threat"].active {
            background: #f5f5f5;
            border: 1px solid #e2e2e2;
        }

        .endangered div[class*="threat"] [class*="fa"]:not(.fa-xs) {
            font-size: 50px;
        }

        .endangered .threat-limited [class*="fa"] {
            color: #ded014;
        }

        .endangered .threat-rising [class*="fa"] {
            color: #e27807;
        }

        .endangered .threat-serious [class*="fa"] {
            color: #d00000;
        }

        .endangered div[class*="threat"] sup {
            position: absolute;
            left: 45px;
            top: -2px;
            width: 50px;
            text-align: left;
            letter-spacing: 2px;
        }

        .endangered div[class*="threat"] span:first-of-type {
            position: relative;
        }

        @media(max-width: 1700px) {

            .atomic-mass {
                max-width: none;
                font-size: 9px;
            }

            .atomic-number {
                font-size: 15px;
            }

            .element-name {
                font-size: 9px;
            }

            .atomic-orbital-shells {
                display: none;
            }

        }

        @media(max-width: 1500px) {

            .atomic-mass {
                display: none;
            }

            .group {
                width: 5%;
                min-height: 85px;
            }

            .atomic-orbital-shells {
                display: none;
            }

            .category div {
                font-size: 0px;
                padding: 7px 20px;
                position: relative;
            }

            .characteristic {
                max-width: 420px;
                top: 20px;
            }

            .characteristic .non-metals {
                max-width: 125px;
                flex: 0 30%;
            }

            .characteristic .metals {
                flex: 0 60%;
                max-width: 252px;
            }

            .characteristic div span {
                font-size: 12px;
            }

            .endangered {
                font-size: 15px;
            }

            .endangered div[class*="threat"] [class*="fa"]:not(.fa-xs) {
                font-size: 30px;
            }

            .endangered div[class*="threat"] sup {
                left: 25px;
                top: -5px;
                font-size: 10px;
            }

        }

        @media(max-width: 1300px) {

            .atomic-number {
                font-size: 11px;
                text-align: right;
            }

            .element-name {
                display: none;
            }

            .group {
                min-height: inherit;
            }

            .element-symbol strong {
                font-weight: 300;
            }

            div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
                position: absolute;
                right: 10px;
                top: 25px;
            }

            div#lanthanide-series .group:nth-child(2), div#actinide-series .group:nth-child(2) {
                position: relative;
            }

            div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
                position: absolute;
                right: 10px;
                top: 25px;
            }

            div#lanthanide-series .group:nth-child(2):after, div#actinide-series .group:nth-child(2):after {
                font-size: 12px;
                top: auto;
                bottom: 20px;
                left: 0;
            }

        }

        @media(max-width: 1024px) {

            .atomic-number {
                font-size: 12px;
            }

            .element-symbol {
                text-align: center;
            }

            .endangered {
                font-size: 12px;
            }

            .endangered div[class*="threat"] {
                flex-direction: column;
            }

            .endangered div[class*="threat"] span:first-of-type {
                margin-bottom: 10px;
            }

            .card .endangered div[class*="threat"] {
                flex-direction: row;
            }

            .card .endangered div[class*="threat"] span:first-of-type {
                margin-bottom: 0;
            }

        }

        @media(max-width: 980px) {

            .element-symbol {
                font-size: 20px;
            }   

            .element-symbol {
                font-size: 15px;
                text-align: left;
            }

            .atomic-number {
                font-size: 9px;
            }

        }

        @media(max-width: 768px) {

            .group {
                padding: 5px;
            }

            div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
                top: 15px;
            }

            div#lanthanide-series .group:nth-child(2):after, div#actinide-series .group:nth-child(2):after {
                font-size: 15px;
                width: 100%;
                text-align: center;
                right: 0;
            }

            div#lanthanide-series .group:nth-child(2):after {
                content: "Ln";
            }

            div#actinide-series .group:nth-child(2):after {
                content: "An";
            }

            .characteristic div {
                padding: 3px 0px;
                height: 5px;
            }

            .characteristic div span {
                font-size: 12px;
                top: -5px;
            }

            .category .active:after {
                width: 10px;
                height: 10px;
            }

            footer > div span:nth-of-type(3) {
                font-size: 10px;
                margin: 5px 0;
            }

            footer > div span {
                display: block;
            }

            footer > div span.divider {
                display: none;
            }

            .card .element-name {
                font-size: 25px;
            }

            .endangered div[class*="threat"] {
                justify-content: flex-start;
                padding: 5px;
            }

            .endangered div[class*="threat"]:nth-child(2) {
                border-right: 1px solid #e2e2e2;
                border-left: 1px solid #e2e2e2;
            }

            .card .endangered div[class*="threat"] {
                text-align: left;
            }

        }

        @media(max-width: 600px) {

            div#lanthanide-series .group:nth-child(2):after, div#actinide-series .group:nth-child(2):after {
                font-size: 12px;
                bottom: 5px;
            }

            .atomic-number {
                display: none;
            }

            .group .element-symbol {
                text-align: center;
                font-size: 12px;
            }

            #six .lanthanoids .atomic-number:before,#seven .actinoids .atomic-number:before {
                top: 3px;
                font-size: 15px;
            }

            div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
                top: 7px;
            }

            .category div {
                padding: 5px 15px;
            }

            .category .active:after {
                width: 7px;
                height: 7px;
                border: 2px solid white;
            }

            .characteristic {
                max-width: 320px;
                top: 15px;
            }

            .characteristic div span {
                padding: 0px 5px;
                font-size: 10px;
                top: -2px;
            }

            .characteristic div {
                height: 5px;
                padding: 0px;
            }

            .endangered {
                font-size: 10px;
            }

            .endangered div[class*="threat"] [class*="fa"]:not(.fa-xs) {
                font-size: 20px;
            }

            .endangered div[class*="threat"] sup {
                left: 18px;
                top: -3px;
                font-size: 8px;
            }

            .endangered:before {
                width: 130px;
            }

        }

        @media(max-width: 500px) {

            div#lanthanide-series .group:nth-child(2):after, div#actinide-series .group:nth-child(2):after {
                display: none;
            }

            .group .element-symbol {
                font-size: 0px;
            }

            #six .lanthanoids .atomic-number:before, #seven .actinoids .atomic-number:before {
                top: 2px;
                font-size: 12px;
            }

            .group {
                min-height: 25px;
                max-height: 25px;
            }

            div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
                top: 8px;
                font-size: 12px;
            }

            #six .lanthanoids .atomic-number:before,#seven .actinoids .atomic-number:before {
                top: 3px;
                font-size: 15px;
            }

            .array {
                padding-top: 30px !important;
            }

            .group:after {
                border-left: 5px solid transparent !important;
                border-right: 5px solid transparent !important;
                border-top-width: 8px !important;
                bottom: -8px !important;
            }

            .endangered {
                flex-direction: column;
                align-items: flex-start;
                margin-top: 35px;
            }

            .endangered:before {
                width: 100%;
                text-align: left;
                top: 0;
                position: relative;
                margin-bottom: 15px;
                border-bottom: 2px solid #e2e2e2;
                padding-bottom: 10px;
            }

            .endangered:after {
                visibility: hidden;
                display: none;
            }

            .endangered div[class*="threat"] {
                flex-direction: row;
                flex-basis: 100%;
                flex: 1 1;
                align-items: baseline;
                padding: 10px 5px;
                width: 100%;
            }

            .endangered div[class*="threat"]:nth-child(2) {
                border: 0;
                border-top: 1px solid #e2e2e2;
                border-bottom: 1px solid #e2e2e2;
            }

            .endangered div[class*="threat"]:hover, .endangered div[class*="threat"].active {
                 border: 1px solid #e2e2e2;
             }

            .endangered div[class*="threat"] span:first-of-type {
                margin-bottom: 0;
                margin-right: 10px;
            }

            .card .endangered div[class*="threat"] {
                align-items: center;
            }

        }

        @media(max-width: 400px) {

            .group {
                min-height: 20px;
                max-height: 20px;
            }

            #six .lanthanoids .atomic-number:before, #seven .actinoids .atomic-number:before {
                font-size: 10px;
                top: 2px;
            }

            div#lanthanide-series .group:nth-child(2):before, div#actinide-series .group:nth-child(2):before {
                font-size: 10px;
            }

        }

        @media(max-width: 350px) {

            .category {
                justify-content: space-between;
            }

            .category div {
                flex: 1 1;
                padding: 5px 0px;
            }

            .characteristic {
                max-width: none;
            }

            .characteristic .non-metals {
                max-width: none;
                flex: 0 30%;
            }

            .characteristic .metals {
                max-width: none;
            }

        }
        </style>
    </head>
    <div class="opl"><a href="https://onepagelove.com/the-periodic-table-of-elements" target="_blank">The Periodic Table Of Elements</a></div>
    <div class="category">
        <div class="other-nonmetals">
            <span>Other Nonmetals</span>
        </div>
        <div class="noble-gases">
            <span>Noble Gases</span>
        </div>
        <div class="halogens">
            <span>Halogens</span>
        </div>
        <div class="metalloids">
            <span>Metalloids</span>
        </div>
        <div class="alkaline-earth-metals">
            <span>Alkaline Earth Metals</span>
        </div>
        <div class="alkali-metals">
            <span>Alkali Metals</span>
        </div>
        <div class="transition-metals">
            <span>Transition Metals</span>
        </div>
        <div class="post-transition-metals">
            <span>Post Transition Metals</span>
        </div>
        <div class="lanthanoids">
            <span>Lanthanoids</span>
        </div>
        <div class="actinoids">
            <span>Actinoids</span>
        </div>
    </div>
    <div class="characteristic">
        <div class="non-metals">
            <span>Nonmetals</span>
        </div>
        <div class="metals">
            <span>Metals</span>
        </div>
    </div>
    <div class="array">
        <div class="period" id="one">
            <div class="group other-nonmetals">
                <div class="atomic-orbital-shells">
                    <span class="K">1</span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    1
                </div>
                <div class="element-symbol">
                    <strong>H</strong>
                </div>
                <div class="element-name">
                    Hydrogen
                </div>
                <div class="atomic-mass">
                    1.008
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group noble-gases threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    2
                </div>
                <div class="element-symbol">
                    <strong>He</strong>
                </div>
                <div class="element-name">
                    Helium
                </div>
                <div class="atomic-mass">
                    4.002602
                </div>
            </div>    
        </div>
        <div class="period" id="two">
            <div class="group alkali-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">1</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    3
                </div>
                <div class="element-symbol">
                    <strong>Li</strong>
                </div>
                <div class="element-name">
                    Lithium
                </div>
                <div class="atomic-mass">
                    6.94
                </div>
            </div>    
            <div class="group alkaline-earth-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">2</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    4
                </div>
                <div class="element-symbol">
                    <strong>Be</strong>
                </div>
                <div class="element-name">
                    Beryllium
                </div>
                <div class="atomic-mass">
                    9.0121831
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group metalloids threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">3</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    5
                </div>
                <div class="element-symbol">
                    <strong>B</strong>
                </div>
                <div class="element-name">
                    Boron
                </div>
                <div class="atomic-mass">
                    10.81
                </div>
            </div>    
            <div class="group other-nonmetals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">4</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    6
                </div>
                <div class="element-symbol">
                    <strong>C</strong>
                </div>
                <div class="element-name">
                    Carbon
                </div>
                <div class="atomic-mass">
                    12.011
                </div>
            </div>    
            <div class="group other-nonmetals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">5</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    7
                </div>
                <div class="element-symbol">
                    <strong>N</strong>
                </div>
                <div class="element-name">
                    Nitrogen
                </div>
                <div class="atomic-mass">
                    14.007
                </div>
            </div>    
            <div class="group other-nonmetals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">6</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    8
                </div>
                <div class="element-symbol">
                    <strong>O</strong>
                </div>
                <div class="element-name">
                    Oxygen
                </div>
                <div class="atomic-mass">
                    15.999
                </div>
            </div>    
            <div class="group halogens">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">7</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    9
                </div>
                <div class="element-symbol">
                    <strong>F</strong>
                </div>
                <div class="element-name">
                    Fluorine
                </div>
                <div class="atomic-mass">
                    18.998403163
                </div>
            </div>    
            <div class="group noble-gases">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    10
                </div>
                <div class="element-symbol">
                    <strong>Ne</strong>
                </div>
                <div class="element-name">
                    Neon
                </div>
                <div class="atomic-mass">
                    20.1797
                </div>
            </div>    
        </div>
        <div class="period" id="three">
            <div class="group alkali-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">1</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    11
                </div>
                <div class="element-symbol">
                    <strong>Na</strong>
                </div>
                <div class="element-name">
                    Sodium
                </div>
                <div class="atomic-mass">
                    24.305
                </div>
            </div>    
            <div class="group alkaline-earth-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">2</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    12
                </div>
                <div class="element-symbol">
                    <strong>Mg</strong>
                </div>
                <div class="element-name">
                    Magnesium
                </div>
                <div class="atomic-mass">
                    22.98976928
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group post-transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">3</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    13
                </div>
                <div class="element-symbol">
                    <strong>Al</strong>
                </div>
                <div class="element-name">
                    Aluminium
                </div>
                <div class="atomic-mass">
                    26.9815385
                </div>
            </div>    
            <div class="group metalloids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">4</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    14
                </div>
                <div class="element-symbol">
                    <strong>Si</strong>
                </div>
                <div class="element-name">
                    Silicon
                </div>
                <div class="atomic-mass">
                    28.085
                </div>
            </div>    
            <div class="group other-nonmetals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">5</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    15
                </div>
                <div class="element-symbol">
                    <strong>P</strong>
                </div>
                <div class="element-name">
                    Phosphorus
                </div>
                <div class="atomic-mass">
                    30.973761998
                </div>
            </div>    
            <div class="group other-nonmetals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">6</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    16
                </div>
                <div class="element-symbol">
                    <strong>S</strong>
                </div>
                <div class="element-name">
                    Sulfur
                </div>
                <div class="atomic-mass">
                    32.06
                </div>
            </div>    
            <div class="group halogens">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">7</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    17
                </div>
                <div class="element-symbol">
                    <strong>Cl</strong>
                </div>
                <div class="element-name">
                    Chlorine
                </div>
                <div class="atomic-mass">
                    35.45
                </div>
            </div>    
            <div class="group noble-gases">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">8</span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    18
                </div>
                <div class="element-symbol">
                    <strong>Ar</strong>
                </div>
                <div class="element-name">
                    Argon
                </div>
                <div class="atomic-mass">
                    39.948
                </div>
            </div>    
        </div>
        <div class="period" id="four">
            <div class="group alkali-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">8</span>
                    <span class="N">1</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    19
                </div>
                <div class="element-symbol">
                    <strong>K</strong>
                </div>
                <div class="element-name">
                    Potassium
                </div>
                <div class="atomic-mass">
                    39.0983
                </div>
            </div>    
            <div class="group alkaline-earth-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">8</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    20
                </div>
                <div class="element-symbol">
                    <strong>Ca</strong>
                </div>
                <div class="element-name">
                    Calcium
                </div>
                <div class="atomic-mass">
                    40.078
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">9</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    21
                </div>
                <div class="element-symbol">
                    <strong>Sc</strong>
                </div>
                <div class="element-name">
                    Scandium
                </div>
                <div class="atomic-mass">
                    44.955908
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">10</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    22
                </div>
                <div class="element-symbol">
                    <strong>Ti</strong>
                </div>
                <div class="element-name">
                    Titanium
                </div>
                <div class="atomic-mass">
                    47.867
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">11</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    23
                </div>
                <div class="element-symbol">
                    <strong>V</strong>
                </div>
                <div class="element-name">
                    Vanadium
                </div>
                <div class="atomic-mass">
                    50.9415
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">13</span>
                    <span class="N">1</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    24
                </div>
                <div class="element-symbol">
                    <strong>Cr</strong>
                </div>
                <div class="element-name">
                    Chromium
                </div>
                <div class="atomic-mass">
                    51.9961
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">13</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    25
                </div>
                <div class="element-symbol">
                    <strong>Mn</strong>
                </div>
                <div class="element-name">
                    Manganese
                </div>
                <div class="atomic-mass">
                    54.938044
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">14</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    26
                </div>
                <div class="element-symbol">
                    <strong>Fe</strong>
                </div>
                <div class="element-name">
                    Iron
                </div>
                <div class="atomic-mass">
                    55.845
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">15</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    27
                </div>
                <div class="element-symbol">
                    <strong>Co</strong>
                </div>
                <div class="element-name">
                    Cobolt
                </div>
                <div class="atomic-mass">
                    58.933194
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">16</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    28
                </div>
                <div class="element-symbol">
                    <strong>Ni</strong>
                </div>
                <div class="element-name">
                    Nickel
                </div>
                <div class="atomic-mass">
                    58.6934
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">1</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    29
                </div>
                <div class="element-symbol">
                    <strong>Cu</strong>
                </div>
                <div class="element-name">
                    Copper
                </div>
                <div class="atomic-mass">
                    63.546
                </div>
            </div>    
            <div class="group transition-metals threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">2</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    30
                </div>
                <div class="element-symbol">
                    <strong>Zn</strong>
                </div>
                <div class="element-name">
                    Zinc
                </div>
                <div class="atomic-mass">
                    65.38
                </div>
            </div>    
            <div class="group post-transition-metals threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">3</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    31
                </div>
                <div class="element-symbol">
                    <strong>Ga</strong>
                </div>
                <div class="element-name">
                    Gallium
                </div>
                <div class="atomic-mass">
                    69.723
                </div>
            </div>    
            <div class="group metalloids threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">4</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    32
                </div>
                <div class="element-symbol">
                    <strong>Ge</strong>
                </div>
                <div class="element-name">
                    Germanium
                </div>
                <div class="atomic-mass">
                    72.63
                </div>
            </div>    
            <div class="group metalloids threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">5</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    33
                </div>
                <div class="element-symbol">
                    <strong>As</strong>
                </div>
                <div class="element-name">
                    Arsenic
                </div>
                <div class="atomic-mass">
                    74.921595
                </div>
            </div>    
            <div class="group other-nonmetals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">16</span>
                    <span class="N">6</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    34
                </div>
                <div class="element-symbol">
                    <strong>Se</strong>
                </div>
                <div class="element-name">
                    Selenium
                </div>
                <div class="atomic-mass">
                    78.971
                </div>
            </div>    
            <div class="group halogens">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">7</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    35
                </div>
                <div class="element-symbol">
                    <strong>Br</strong>
                </div>
                <div class="element-name">
                    Bromine
                </div>
                <div class="atomic-mass">
                    79.904
                </div>
            </div>    
            <div class="group noble-gases">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">8</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    36
                </div>
                <div class="element-symbol">
                    <strong>Kr</strong>
                </div>
                <div class="element-name">
                    Krypton
                </div>
                <div class="atomic-mass">
                    83.798
                </div>
            </div>    
        </div>
        <div class="period" id="five">
            <div class="group alkali-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">8</span>
                    <span class="O">1</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    37
                </div>
                <div class="element-symbol">
                    <strong>Rb</strong>
                </div>
                <div class="element-name">
                    Rubidium
                </div>
                <div class="atomic-mass">
                    85.4678
                </div>
            </div>    
            <div class="group alkaline-earth-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">8</span>
                    <span class="O">2</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    38
                </div>
                <div class="element-symbol">
                    <strong>Sr</strong>
                </div>
                <div class="element-name">
                    Strontium
                </div>
                <div class="atomic-mass">
                    87.62
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">9</span>
                    <span class="O">2</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    39
                </div>
                <div class="element-symbol">
                    <strong>Y</strong>
                </div>
                <div class="element-name">
                    Yttrium
                </div>
                <div class="atomic-mass">
                    8.90584
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">10</span>
                    <span class="O">2</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    40
                </div>
                <div class="element-symbol">
                    <strong>Zr</strong>
                </div>
                <div class="element-name">
                    Zirconium
                </div>
                <div class="atomic-mass">
                    91.224
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">12</span>
                    <span class="O">1</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    41
                </div>
                <div class="element-symbol">
                    <strong>Nb</strong>
                </div>
                <div class="element-name">
                    Niobium
                </div>
                <div class="atomic-mass">
                    92.90637
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">13</span>
                    <span class="O">1</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    42
                </div>
                <div class="element-symbol">
                    <strong>Mo</strong>
                </div>
                <div class="element-name">
                    Molybdenum
                </div>
                <div class="atomic-mass">
                    95.95
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">13</span>
                    <span class="O">2</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    43
                </div>
                <div class="element-symbol">
                    <strong>Tc</strong>
                </div>
                <div class="element-name">
                    Technetium
                </div>
                <div class="atomic-mass">
                    (98)
                </div>
            </div>    
            <div class="group transition-metals threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">15</span>
                    <span class="O">1</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    44
                </div>
                <div class="element-symbol">
                    <strong>Ru</strong>
                </div>
                <div class="element-name">
                    Ruthenium
                </div>
                <div class="atomic-mass">
                    101.07
                </div>
            </div>    
            <div class="group transition-metals threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">16</span>
                    <span class="O">1</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    45
                </div>
                <div class="element-symbol">
                    <strong>Rh</strong>
                </div>
                <div class="element-name">
                    Rhodium
                </div>
                <div class="atomic-mass">
                    102.90550
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    46
                </div>
                <div class="element-symbol">
                    <strong>Pd</strong>
                </div>
                <div class="element-name">
                    Palladium
                </div>
                <div class="atomic-mass">
                    106.42
                </div>
            </div>    
            <div class="group transition-metals threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">1</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    47
                </div>
                <div class="element-symbol">
                    <strong>Ag</strong>
                </div>
                <div class="element-name">
                    Silver
                </div>
                <div class="atomic-mass">
                    107.8682
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">2</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    48
                </div>
                <div class="element-symbol">
                    <strong>Cd</strong>
                </div>
                <div class="element-name">
                    Cadmium
                </div>
                <div class="atomic-mass">
                    112.414
                </div>
            </div>    
            <div class="group post-transition-metals threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">3</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    49
                </div>
                <div class="element-symbol">
                    <strong>In</strong>
                </div>
                <div class="element-name">
                    Indium
                </div>
                <div class="atomic-mass">
                    114.818
                </div>
            </div>    
            <div class="group post-transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">4</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    50
                </div>
                <div class="element-symbol">
                    <strong>Sn</strong>
                </div>
                <div class="element-name">
                    Tin
                </div>
                <div class="atomic-mass">
                    118.710
                </div>
            </div>    
            <div class="group metalloids threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">5</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    51
                </div>
                <div class="element-symbol">
                    <strong>Sb</strong>
                </div>
                <div class="element-name">
                    Antimony
                </div>
                <div class="atomic-mass">
                    121.76
                </div>
            </div>    
            <div class="group metalloids threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">6</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    52
                </div>
                <div class="element-symbol">
                    <strong>Te</strong>
                </div>
                <div class="element-name">
                    Tellurium
                </div>
                <div class="atomic-mass">
                    127.60
                </div>
            </div>    
            <div class="group halogens">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">7</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    53
                </div>
                <div class="element-symbol">
                    <strong>I</strong>
                </div>
                <div class="element-name">
                    Iodine
                </div>
                <div class="atomic-mass">
                    126.90447
                </div>
            </div>    
            <div class="group noble-gases">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">8</span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    54
                </div>
                <div class="element-symbol">
                    <strong>Xe</strong>
                </div>
                <div class="element-name">
                    Xenon
                </div>
                <div class="atomic-mass">
                    131.293
                </div>
            </div>    
        </div>
        <div class="period" id="six">
            <div class="group alkali-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">8</span>
                    <span class="P">1</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    55
                </div>
                <div class="element-symbol">
                    <strong>Cs</strong>
                </div>
                <div class="element-name">
                    Caesium
                </div>
                <div class="atomic-mass">
                    132.90545196
                </div>
            </div>    
            <div class="group alkaline-earth-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">8</span>
                    <span class="P">1</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    56
                </div>
                <div class="element-symbol">
                    <strong>Ba</strong>
                </div>
                <div class="element-name">
                    Barium
                </div>
                <div class="atomic-mass">
                    137.327
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    57 - 71
                </div>
                <div class="element-symbol">
                    Ln
                </div>
                <div class="element-name">
                    Lanthanoids
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group transition-metals threat-serious">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">10</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    72
                </div>
                <div class="element-symbol">
                    <strong>Hf</strong>
                </div>
                <div class="element-name">
                    Hafnium
                </div>
                <div class="atomic-mass">
                    178.49
                </div>
            </div>    
            <div class="group transition-metals threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">11</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    73
                </div>
                <div class="element-symbol">
                    <strong>Ta</strong>
                </div>
                <div class="element-name">
                    Tantalum
                </div>
                <div class="atomic-mass">
                    180.94788
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">12</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    74
                </div>
                <div class="element-symbol">
                    <strong>W</strong>
                </div>
                <div class="element-name">
                    Tungsten
                </div>
                <div class="atomic-mass">
                    183.84
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">13</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    75
                </div>
                <div class="element-symbol">
                    <strong>Re</strong>
                </div>
                <div class="element-name">
                    Rhenium
                </div>
                <div class="atomic-mass">
                    186.207
                </div>
            </div>    
            <div class="group transition-metals threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">14</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    76
                </div>
                <div class="element-symbol">
                    <strong>Os</strong>
                </div>
                <div class="element-name">
                    Osmium
                </div>
                <div class="atomic-mass">
                    190.23
                </div>
            </div>    
            <div class="group transition-metals threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">15</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    77
                </div>
                <div class="element-symbol">
                    <strong>Ir</strong>
                </div>
                <div class="element-name">
                    Iridium
                </div>
                <div class="atomic-mass">
                    192.217
                </div>
            </div>    
            <div class="group transition-metals threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">17</span>
                    <span class="P">1</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    78
                </div>
                <div class="element-symbol">
                    <strong>Pt</strong>
                </div>
                <div class="element-name">
                    Platinum
                </div>
                <div class="atomic-mass">
                    195.084
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">1</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    79
                </div>
                <div class="element-symbol">
                    <strong>Au</strong>
                </div>
                <div class="element-name">
                    Gold
                </div>
                <div class="atomic-mass">
                    196.966569
                </div>
            </div>    
            <div class="group transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    80
                </div>
                <div class="element-symbol">
                    <strong>Hg</strong>
                </div>
                <div class="element-name">
                    Mercury
                </div>
                <div class="atomic-mass">
                    200.59
                </div>
            </div>    
            <div class="group post-transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">3</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    81
                </div>
                <div class="element-symbol">
                    <strong>Tl</strong>
                </div>
                <div class="element-name">
                    Thallium
                </div>
                <div class="atomic-mass">
                    204.38
                </div>
            </div>    
            <div class="group post-transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">4</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    82
                </div>
                <div class="element-symbol">
                    <strong>Pb</strong>
                </div>
                <div class="element-name">
                    Lead
                </div>
                <div class="atomic-mass">
                    207.2
                </div>
            </div>    
            <div class="group post-transition-metals threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">5</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    83
                </div>
                <div class="element-symbol">
                    <strong>Bi</strong>
                </div>
                <div class="element-name">
                    Bismuth
                </div>
                <div class="atomic-mass">
                    208.98040
                </div>
            </div>    
            <div class="group metalloids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">6</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    84
                </div>
                <div class="element-symbol">
                    <strong>Po</strong>
                </div>
                <div class="element-name">
                    Polonium
                </div>
                <div class="atomic-mass">
                    (209)
                </div>
            </div>    
            <div class="group halogens">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">7</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    85
                </div>
                <div class="element-symbol">
                    <strong>At</strong>
                </div>
                <div class="element-name">
                    Astatine
                </div>
                <div class="atomic-mass">
                    (210)
                </div>
            </div>    
            <div class="group noble-gases">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">8</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    86
                </div>
                <div class="element-symbol">
                    <strong>Rn</strong>
                </div>
                <div class="element-name">
                    Radon
                </div>
                <div class="atomic-mass">
                    (222)
                </div>
            </div>    
        </div>
        <div class="period" id="seven">
            <div class="group alkali-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">8</span>
                    <span class="Q">1</span>
                </div>
                <div class="atomic-number">
                    87
                </div>
                <div class="element-symbol">
                    <strong>Fr</strong>
                </div>
                <div class="element-name">
                    Francium
                </div>
                <div class="atomic-mass">
                    (223)
                </div>
            </div>    
            <div class="group alkaline-earth-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    88
                </div>
                <div class="element-symbol">
                    <strong>Ra</strong>
                </div>
                <div class="element-name">
                    Radium
                </div>
                <div class="atomic-mass">
                    (226)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    89 - 103
                </div>
                <div class="element-symbol">
                    An
                </div>
                <div class="element-name">
                    Actinoids
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">10</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    104
                </div>
                <div class="element-symbol">
                    <strong>Rf</strong>
                </div>
                <div class="element-name">
                    Rutherfordium
                </div>
                <div class="atomic-mass">
                    (267)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">11</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    105
                </div>
                <div class="element-symbol">
                    <strong>Db</strong>
                </div>
                <div class="element-name">
                    Dubnium
                </div>
                <div class="atomic-mass">
                    (268)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">12</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    106
                </div>
                <div class="element-symbol">
                    <strong>Sg</strong>
                </div>
                <div class="element-name">
                    Seaborgium
                </div>
                <div class="atomic-mass">
                    (271)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">13</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    107
                </div>
                <div class="element-symbol">
                    <strong>Bh</strong>
                </div>
                <div class="element-name">
                    Bohrium
                </div>
                <div class="atomic-mass">
                    (272)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">14</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    108
                </div>
                <div class="element-symbol">
                    <strong>Hs</strong>
                </div>
                <div class="element-name">
                    Hassium
                </div>
                <div class="atomic-mass">
                    (270)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">15</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    109
                </div>
                <div class="element-symbol">
                    <strong>Mt</strong>
                </div>
                <div class="element-name">
                    Meitnerium
                </div>
                <div class="atomic-mass">
                    (276)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">17</span>
                    <span class="Q">1</span>
                </div>
                <div class="atomic-number">
                    110
                </div>
                <div class="element-symbol">
                    <strong>Ds</strong>
                </div>
                <div class="element-name">
                    Darmstadtium
                </div>
                <div class="atomic-mass">
                    (281)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">1</span>
                </div>
                <div class="atomic-number">
                    111
                </div>
                <div class="element-symbol">
                    <strong>Rg</strong>
                </div>
                <div class="element-name">
                    Roentgenium
                </div>
                <div class="atomic-mass">
                    (280)
                </div>
            </div>    
            <div class="group transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    112
                </div>
                <div class="element-symbol">
                    <strong>Cn</strong>
                </div>
                <div class="element-name">
                    Copernicium
                </div>
                <div class="atomic-mass">
                    (285)
                </div>
            </div>    
            <div class="group post-transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">3</span>
                </div>
                <div class="atomic-number">
                    113
                </div>
                <div class="element-symbol">
                    <strong>Nh</strong>
                </div>
                <div class="element-name">
                    Nihonium
                </div>
                <div class="atomic-mass">
                    (284)
                </div>
            </div>    
            <div class="group post-transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">4</span>
                </div>
                <div class="atomic-number">
                    114
                </div>
                <div class="element-symbol">
                    <strong>Fl</strong>
                </div>
                <div class="element-name">
                    Flerovium
                </div>
                <div class="atomic-mass">
                    (289)
                </div>
            </div>    
            <div class="group post-transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">5</span>
                </div>
                <div class="atomic-number">
                    115
                </div>
                <div class="element-symbol">
                    <strong>Mc</strong>
                </div>
                <div class="element-name">
                    Moscovium
                </div>
                <div class="atomic-mass">
                    (288)
                </div>
            </div>    
            <div class="group post-transition-metals">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">6</span>
                </div>
                <div class="atomic-number">
                    116
                </div>
                <div class="element-symbol">
                    <strong>Lv</strong>
                </div>
                <div class="element-name">
                    Livermorium
                </div>
                <div class="atomic-mass">
                    (293)
                </div>
            </div>    
            <div class="group metalloids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">7</span>
                </div>
                <div class="atomic-number">
                    117
                </div>
                <div class="element-symbol">
                    <strong>Ts</strong>
                </div>
                <div class="element-name">
                    Tennessine
                </div>
                <div class="atomic-mass">
                    (294)
                </div>
            </div>    
            <div class="group noble-gases">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">18</span>
                    <span class="Q">8</span>
                </div>
                <div class="atomic-number">
                    118
                </div>
                <div class="element-symbol">
                    <strong>Og</strong>
                </div>
                <div class="element-name">
                    Oganesson
                </div>
                <div class="atomic-mass">
                    (294)
                </div>
            </div>    
        </div>
        <div class="break"></div>
        <div class="period" id="lanthanide-series">
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>  
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">18</span>
                    <span class="O">9</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    57
                </div>
                <div class="element-symbol">
                    <strong>La</strong>
                </div>
                <div class="element-name">
                    Lanthanum
                </div>
                <div class="atomic-mass">
                    138.90547
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">19</span>
                    <span class="O">9</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    58
                </div>
                <div class="element-symbol">
                    <strong>Ce</strong>
                </div>
                <div class="element-name">
                    Cerium
                </div>
                <div class="atomic-mass">
                    140.116
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">21</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    59
                </div>
                <div class="element-symbol">
                    <strong>Pr</strong>
                </div>
                <div class="element-name">
                    Praseodymium
                </div>
                <div class="atomic-mass">
                    140.90766
                </div>
            </div>    
            <div class="group lanthanoids threat-limited">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">22</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    60
                </div>
                <div class="element-symbol">
                    <strong>Nd</strong>
                </div>
                <div class="element-name">
                    Neodymium
                </div>
                <div class="atomic-mass">
                    144.242
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">23</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    61
                </div>
                <div class="element-symbol">
                    <strong>Pm</strong>
                </div>
                <div class="element-name">
                    Promethium
                </div>
                <div class="atomic-mass">
                    (145)
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">24</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    62
                </div>
                <div class="element-symbol">
                    <strong>Sm</strong>
                </div>
                <div class="element-name">
                    Samarium
                </div>
                <div class="atomic-mass">
                    150.36
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">25</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    63
                </div>
                <div class="element-symbol">
                    <strong>Eu</strong>
                </div>
                <div class="element-name">
                    Europium
                </div>
                <div class="atomic-mass">
                    151.964
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">25</span>
                    <span class="O">9</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    64
                </div>
                <div class="element-symbol">
                    <strong>Gd</strong>
                </div>
                <div class="element-name">
                    Gadolinium
                </div>
                <div class="atomic-mass">
                    157.25
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">27</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    65
                </div>
                <div class="element-symbol">
                    <strong>Tb</strong>
                </div>
                <div class="element-name">
                    Terbium
                </div>
                <div class="atomic-mass">
                    158.92535
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">28</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    66
                </div>
                <div class="element-symbol">
                    <strong>Dy</strong>
                </div>
                <div class="element-name">
                    Dysprosium
                </div>
                <div class="atomic-mass">
                    162.500
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">29</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    67
                </div>
                <div class="element-symbol">
                    <strong>Ho</strong>
                </div>
                <div class="element-name">
                    Holmium
                </div>
                <div class="atomic-mass">
                    164.93033
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">30</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    68
                </div>
                <div class="element-symbol">
                    <strong>Er</strong>
                </div>
                <div class="element-name">
                    Erbium
                </div>
                <div class="atomic-mass">
                    167.259
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">31</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    69
                </div>
                <div class="element-symbol">
                    <strong>Tm</strong>
                </div>
                <div class="element-name">
                    Thulium
                </div>
                <div class="atomic-mass">
                    168.93422
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">8</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    70
                </div>
                <div class="element-symbol">
                    <strong>Yb</strong>
                </div>
                <div class="element-name">
                    Ytterbium
                </div>
                <div class="atomic-mass">
                    173.054
                </div>
            </div>    
            <div class="group lanthanoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">9</span>
                    <span class="P">2</span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                    71
                </div>
                <div class="element-symbol">
                    <strong>Lu</strong>
                </div>
                <div class="element-name">
                    Lutetium
                </div>
                <div class="atomic-mass">
                    174.9668
                </div>
            </div>  
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>     
        </div>
        <div class="period" id="actinide-series">
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>   
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">9</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    89
                </div>
                <div class="element-symbol">
                    <strong>Ac</strong>
                </div>
                <div class="element-name">
                    Actinium
                </div>
                <div class="atomic-mass">
                    (227)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">18</span>
                    <span class="P">10</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    90
                </div>
                <div class="element-symbol">
                    <strong>Th</strong>
                </div>
                <div class="element-name">
                    Thorium
                </div>
                <div class="atomic-mass">
                    232.0377
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">20</span>
                    <span class="P">9</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    91
                </div>
                <div class="element-symbol">
                    <strong>Pa</strong>
                </div>
                <div class="element-name">
                    Protactinium
                </div>
                <div class="atomic-mass">
                    231.03588
                </div>
            </div>    
            <div class="group actinoids threat-rising">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">21</span>
                    <span class="P">9</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    92
                </div>
                <div class="element-symbol">
                    <strong>U</strong>
                </div>
                <div class="element-name">
                    Uranium
                </div>
                <div class="atomic-mass">
                    238.02891
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">22</span>
                    <span class="P">9</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    93
                </div>
                <div class="element-symbol">
                    <strong>Np</strong>
                </div>
                <div class="element-name">
                    Neptunium
                </div>
                <div class="atomic-mass">
                    (237)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">24</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    94
                </div>
                <div class="element-symbol">
                    <strong>Pu</strong>
                </div>
                <div class="element-name">
                    Plutonium
                </div>
                <div class="atomic-mass">
                    (244)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">25</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    95
                </div>
                <div class="element-symbol">
                    <strong>Am</strong>
                </div>
                <div class="element-name">
                    Americium
                </div>
                <div class="atomic-mass">
                    (243)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">25</span>
                    <span class="P">9</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    96
                </div>
                <div class="element-symbol">
                    <strong>Cm</strong>
                </div>
                <div class="element-name">
                    Curium
                </div>
                <div class="atomic-mass">
                    (247)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">27</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    97
                </div>
                <div class="element-symbol">
                    <strong>Bk</strong>
                </div>
                <div class="element-name">
                    Berkelium
                </div>
                <div class="atomic-mass">
                    (247)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">28</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    98
                </div>
                <div class="element-symbol">
                    <strong>Cf</strong>
                </div>
                <div class="element-name">
                    Californium
                </div>
                <div class="atomic-mass">
                    (251)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">29</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    99
                </div>
                <div class="element-symbol">
                    <strong>Es</strong>
                </div>
                <div class="element-name">
                    Einsteinium
                </div>
                <div class="atomic-mass">
                    (252)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">30</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    100
                </div>
                <div class="element-symbol">
                    <strong>Fm</strong>
                </div>
                <div class="element-name">
                    Fermium
                </div>
                <div class="atomic-mass">
                    (257)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">31</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    101
                </div>
                <div class="element-symbol">
                    <strong>Md</strong>
                </div>
                <div class="element-name">
                    Mendelevium
                </div>
                <div class="atomic-mass">
                    (258)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">8</span>
                    <span class="Q">2</span>
                </div>
                <div class="atomic-number">
                    102
                </div>
                <div class="element-symbol">
                    <strong>No</strong>
                </div>
                <div class="element-name">
                    Nobelium
                </div>
                <div class="atomic-mass">
                    (259)
                </div>
            </div>    
            <div class="group actinoids">
                <div class="atomic-orbital-shells">
                    <span class="K">2</span>
                    <span class="L">8</span>
                    <span class="M">18</span>
                    <span class="N">32</span>
                    <span class="O">32</span>
                    <span class="P">8</span>
                    <span class="Q">3</span>
                </div>
                <div class="atomic-number">
                    103
                </div>
                <div class="element-symbol">
                    <strong>Lr</strong>
                </div>
                <div class="element-name">
                    Lawrencium
                </div>
                <div class="atomic-mass">
                    (262)
                </div>
            </div>  
            <div class="group empty">
                <div class="atomic-orbital-shells">
                    <span class="K"></span>
                    <span class="L"></span>
                    <span class="M"></span>
                    <span class="N"></span>
                    <span class="O"></span>
                    <span class="P"></span>
                    <span class="Q"></span>
                </div>
                <div class="atomic-number">
                </div>
                <div class="element-symbol">
                </div>
                <div class="element-name">
                </div>
                <div class="atomic-mass">
                </div>
            </div>     
        </div>
        <div class="endangered">
            <div class="threat-limited">
                <span><i class="fas fa-exclamation-triangle"></i><sup><i class="fas fa-circle fa-xs"></i></sup></span> <span>Limited Availability - Future risk to supply</span>
            </div>
            <div class="threat-rising">
                <span><i class="fas fa-exclamation-triangle"></i><sup><i class="fas fa-circle fa-xs"></i><i class="fas fa-circle fa-xs"></i></sup></span> <span>Rising Threat - from increased use</span>
            </div>
            <div class="threat-serious">
                <span><i class="fas fa-exclamation-triangle"></i><sup><i class="fas fa-circle fa-xs"></i><i class="fas fa-circle fa-xs"></i><i class="fas fa-circle fa-xs"></i></sup></span> <span>Serious Threat - in the next 100 years</span>
            </div>
        </div>
    </div>
    <footer>
        <div>
        	<span>&copy; PeriodicTableOfChemicalElements.com <?php echo date("Y"); ?></span> <span class="divider">|</span> <span>Last updated: June 17<sup>th</sup> 2018</span> <span class="divider">|</span> <span><a href="mailto:info@periodictableofchemicalelements.com"><i class="fas fa-at"></i>contact</a></span>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
    <script>
    jQuery(document).ready(function(){
	    jQuery('.category div, .endangered div').on('mouseenter', function(){

	        if(!jQuery(this).hasClass('active')){

	            var focusClass = jQuery(this).attr('class');
	            jQuery(this).addClass('hover');

	            jQuery('.group').each(function(){

	                if((!jQuery(this).hasClass(focusClass)) && (!jQuery(this).hasClass('empty')) && (!jQuery(this).hasClass('active-group'))) {
	                    jQuery(this).addClass('no-focus');
	                } else if ((jQuery(this).hasClass(focusClass)) && (jQuery(this).hasClass('no-focus'))) {
	                    jQuery(this).removeClass('no-focus');
	                }

	            });
	            jQuery('.info').addClass('no-focus');

	            jQuery(this).on('click', function(){
	                jQuery(this).removeClass('hover').addClass('active');

	                setTimeout(function(){
	                    jQuery(this).addClass('focus');

	                    setTimeout(function(){
	                        jQuery(this).removeClass('focus');
	                    },500);

	                },500);

	                if(jQuery(this).hasClass('active')) {
	                    jQuery('.group').filter('.'+focusClass).each(function(i, el){

	                        jQuery(this).addClass('active-group');

	                        setTimeout(function(){
	                            jQuery(el).addClass('focus');

	                            setTimeout(function(){
	                                jQuery(el).removeClass('focus');
	                            },500 + ( i * 10 ));

	                        },500 + ( i * 100 ));

	                    });
	                } else {
	                    jQuery('.group').filter('.'+focusClass).each(function(el){
	                        
	                        jQuery(el).removeClass('active-group');

	                    });
	                }

	            });

	        } else {

	            var focusClass = jQuery(this).attr('class').trim(),
	                focusClass = focusClass.replace('active','');
	            console.log('class for active',focusClass);

	            jQuery(this).on('click', function(){

	                jQuery(this).removeClass('active');
	                jQuery('.group').filter('.'+focusClass).each(function(){

	                    jQuery('.'+focusClass).removeClass('active-group');

	                });

	            });

	        }

	        jQuery('.category .hover, .endangered .hover').on('mouseleave', function(){

	            jQuery(this).removeClass('hover');

	            var focusClass = jQuery(this).attr('class');
	            jQuery('.group').filter('.'+focusClass).each(function(el){

	                if(!jQuery('.'+focusClass).hasClass('active-group')) {
	                    jQuery(this).addClass('no-focus');
	                }

	            });

	            if(jQuery('.active').length === 0){ 
	                jQuery('.group').removeClass('no-focus');
	                jQuery('.group').removeClass('active-group');
	                jQuery('.info').removeClass('no-focus');

	            }

	        });

	    });

	    jQuery('.group').on('click', function(){

	        var el = jQuery(this).find('.element-symbol').text().trim().toLowerCase(),
	            elClass = jQuery(this).attr('class').trim().replace('group',''),
	            elParent = jQuery(this).parent();

	        if(jQuery(elParent).next().hasClass('info')){

	            var infoID = jQuery(elParent).next().attr('id');
	            if(infoID === el) {
	                if(jQuery(elParent).next().css('display') == 'none' ){
	                    jQuery('.info').slideDown(500);
	                    jQuery(this).addClass('focus-group');
	                } else {
	                    jQuery('.info').slideUp(200);      
	                    jQuery(this).removeClass('focus-group');         
	                }
	            } else {
	                jQuery('.group').removeClass('focus-group');
	                jQuery(this).addClass('focus-group');
                    jQuery('.wrapper .card').css('opacity','0');

                    if (jQuery('.wrapper-inner .info-loader').length) {
                        jQuery('info-loader').show();
                    } else {
                        jQuery('.wrapper-inner').prepend(jQuery('<i class="fas fa-circle-notch fa-spin"></i>').addClass('info-loader')).show();
                    }

	                jQuery('.info').attr('id', el);

	                jQuery('.info').load(el, function(){
	                    console.log('callback success');
	                });

	                if(jQuery(elParent).next().css('display') == 'none' ){
                        jQuery('.wrapper .card').css('opacity','0');
	                    jQuery('.info').slideDown(500,function(){
                            jQuery('.info-loader').hide();
                            jQuery('.wrapper .card').css('opacity','1');
                        });
	                }
	            }

	        } else {
	            jQuery('.group').removeClass('focus-group');
	            jQuery(this).addClass('focus-group');
	            jQuery('.info').slideUp(200, function(){
	                jQuery(this).remove();
	            });            
	            jQuery('<div class="info"></div>').insertAfter(elParent).hide();

	            jQuery('.info').attr('id', el);

                if (jQuery('.info-loader-overlay').length) {
                    jQuery('.info-loader-overlay').show();
                } else {
                    jQuery('.array').prepend('<div class="info-loader-overlay"><i class="fas fa-circle-notch fa-spin info-loader"></i></div>').show();
                }

	            jQuery('.info').load(el, function(){
	                console.log('callback success');
	                jQuery('.info').slideDown(500,function(){
                        jQuery('.info-loader-overlay').hide();
                    });
	            });
	        }   

	    });
	    
        jQuery(document).on('click', '.close', function(){

            jQuery('.info').slideUp(200);
            jQuery('.group').removeClass('focus-group');

        });      
    
	});
    </script>
</html>