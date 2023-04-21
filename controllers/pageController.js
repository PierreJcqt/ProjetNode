exports.dashboard = (req, res, next) => {
    req.flash('success', 'Opération quelconque correctement effectuée !');
    next();
  };
  

  exports.dashboard = (req, res, next) => {
    req.flash('error', 'Email et/ou mot de passe invalide !');
    next();
  };

