<?php

require_once 'init.php';

$googleClient = new Google_Client;
$auth = new GoogleAuth($googleClient);

if($auth->checkRedirectCode()){
    header('Location: index.php');
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Mini Israel</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div id="wrapper">
            <header>
                <a href="index.html" id="logo"></a> 
            </header>

            <div class="mobile-nav">

                <nav role="navigation">
                  <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    
                    <ul id="menu">
                      <a href="#"><li>מידע למבקרים</li></a>
                      <a href="#"><li>משפחות ומבקרים</li></a>
                      <a href="#"><li>מאמרים</li></a>
                      <a href="#"><li>צור קשר</li></a>
                    </ul>
                  </div>
                </nav>
            </div> 

            <nav id="leftNav">
                <ul>
                    <li><a href="#">איפה אנחנו על המפה</a></li>
                    <li><a href="about.html">מאמרים</a></li>
                    <li><a href="#">English</a></li>
                </ul>
            </nav>
            <a href="index.html" id="subLogo"></a> 
            <nav id="rightNav">
                <ul>
                    <li><a href="#">גלה את מיני ישראל</a></li>
                    <li><a href="models.html">מידע למבקרים</a></li>
                    <li><a href="contact.html">צור קשר</a></li>
                </ul>
            </nav>
            <main class="clear">
               <!--  <h1 class="col-md-3 col-lg-3 col-md-offset-9 col-lg-offset-9">מגדלי עזריאלי</h1> -->
                <section id="content">
                    <?php if(!$auth->isLoggedIn()): ?>
                        <a href="<?php echo $auth->getAuthUrl(); ?>">Sign in with Google</a>
                    <?php else: ?>
                        Yoe are signed in <a href="logout.php">Sign out</a>
                    <?php endif; ?>
                </section>
            </main>
            <aside>
                <nav id="sideNav">
                    <ul>
                        <li> <a href="#">משפחות ומבקרים</a></li>
                        <li> <a href="#">אירועים פרטיים ועסקיים</a></li>
                        <li> <a href="#">בתי ספר ומורים</a></li>
                        <li> <a href="#">20.8.2011</a><p><br><br>החג הזה כולם חוגגים במיני ישראל שבועות</p></li>
                        <li> 
                            <a href="#">אנחנו על המפה</a> 
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68326.17096813886!2d34.928196239616135!3d31.841129025442036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502cf13bc48ad49%3A0xb3b1b08ee1f671c9!2sMini+Israel!5e0!3m2!1sen!2sil!4v1468398150604"></iframe>
                        </li>
                    </ul>
                </nav>  
            </aside>
            <footer class="clear">
                
            </footer>
        </div>
        
    </body>
</html>