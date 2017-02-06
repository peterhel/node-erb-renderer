# node-erb-renderer

#usage
    nerb template.erb <<EOF
    {
      "variables": {
        "var_1": "tizanicevar",
        "var_2": "hereiam"
      },
      "node": {
        "cookbook": {
          "defaults": {
            "deeper": {
              "value": "OK!"
            }
          }
        }
      }
    }
    EOF
