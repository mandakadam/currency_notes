var config = {}

config.baseURL = '/';
config.jsonserver = false;
config.JREST = "http://localhost:50001"; //JREST
config.NREST = "/NREST"; //NREST
config.PYTHON = "/JREST";
config.NSERVER = false; // NOTIFICATIONS
config.MEGAMENU = false;
config.MACRO = true;
config.CARD_VIEW = false;
config.DEFAULT_AUTHORISED_PARTICIPANT = "723"
config.OUNCE_CONVERSION = 31.99;
config.NCollection = 'iwebz-etf'; // NOTIFICATIONS ROOM
config.globalDateFormatLong = "dd-mm-yyyy HH24:mi:ss";
config.globalDateFormatShort = "dd-mm-yyyy";
config.globalTimeFormat = "hh:mm:ss";
config.applanguage = "en";
config.macronginxurlprefix = ''
config.fillDummyData = false
config.amtdecimal = 4;

config.AP_ORDER_PORTCODE_SCREEN_CONFIGS = {
    '701': {
        'CHECK_MARKET_MAKING': 'Y',
        "UNIT_MIN_AMOUNT": 2500,
        'BROKER_ID': {
            hide: false,
            disabled: false,
            value: ""
        },
        'BROKERAGE_PERC': {
            hide: false,
            disabled: false,
            value: ""
        },
        'EXCHANGE': {
            hide: false,
            disabled: false,
            value: ""
        },
        "ON_UNCHECK_MARKET_MAKING": {
            'DEAL_TYPE': {
                hide: false,
                disabled: true,
                value: "CASH"
            },
        }
    },
    '705': {
        'DEAL_TYPE': {
            hide: false,
            disabled: true,
            value: "CASH"
        },
        'AUTHORISED_DEALER': {
            hide: false,
            disabled: false,
            value: ""
        },
        'AUTHORIZED_SHIPPER': {
            hide: false,
            disabled: false,
            value: ""
        },
        'LOCATION': {
            hide: false,
            disabled: false,
            value: ""
        }
    },
    'default': {
        'BROKER_ID': {
            hide: true,
            disabled: false,
            value: ""
        },
        'BROKERAGE_PERC': {
            hide: true,
            disabled: false,
            value: ""
        },
        'EXCHANGE': {
            hide: true,
            disabled: false,
            value: ""
        },
        'DEAL_TYPE': {
            hide: false,
            disabled: false,
            value: ""
        },
        'AUTHORISED_DEALER': {
            hide: true,
            disabled: false,
            value: ""
        },
        'AUTHORIZED_SHIPPER': {
            hide: true,
            disabled: false,
            value: ""
        },
        'LOCATION': {
            hide: true,
            disabled: false,
            value: ""
        }
    }
}
