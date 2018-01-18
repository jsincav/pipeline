module.exports = function(app, passport) {

    app.get('/', (req, res) => {
        res.render('login.hbs', {
            pageTitle: 'Lingraphica Dashboards',
            action: 'Sign in', message: req.flash('message')
        });
    });

    app.post('/', passport.authenticate('local', {
        successRedirect: '/pipeline',
        failureRedirect: '/',
        failureFlash: true
        }));

    app.get('/pipeline', (req, res) => {
        res.render('pipeline.hbs', {
            pageTitle: 'Pipeline Snaphot'
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

