import configparser

config = configparser.ConfigParser()


config['Host'] = {  'URL': '127.0.0.1',
                    'USERNAME': 'kamali.selvaraj',
                    'PASSWORD': '621317205022Sk#',
                    'URL1': 'asplapr2213.aspiresys.com'
                }

config['Database'] = { 'ENGINE': 'django.db.backends.mysql',
                       'NAME': 'django',
                       'USER': 'root',
                       'PASSWORD': '621317205022Sk#',
                       'HOST': 'localhost'

}

config['Secretkey'] = { 'KEY': 'django-insecure-9y5yz%s!k@6$z@ygf1&adj8^rlpzim8y!_5e7h)a%(+u+3ra35'

}

with open('configgg.ini', 'w') as configfile:
    config.write(configfile)