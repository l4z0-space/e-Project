
### To run:

1. Clone project

2. Go to Backend/eproject directory

3. Create and enter virtual environment
```bash
$ python3 virtual env
$ source env/bin/activate
```

4. Install requirements
```bash
pip -r  install requirements.txt
```

5. Make Migrations
```bash
$ python manage.py makemigrations
```

6. Migrate to db
```bash
$ python manage.py migrate
```

8. Run tests
```bash
$ python manage.py test
```

9. Run app
```bash
$ python manage.py runserver
```
