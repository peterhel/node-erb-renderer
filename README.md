# node-erb-renderer


#why
Because you want to render erb-files in the easiest way possible.

The command takes one argument; the erb-file. Pass json metadata to stdin to enter the data necessary for rendering.

The stdin data consists of two fundamental properties; `variables` and `node`

## node
`<%= node['default']['here_i_am'] %>` will be replaced with the value in:
    {
        "node": {
            "default": {
                "here_i_am": "rock you like a hurricane!"
            }
        }
    }


## variables
`<%= @imaVar %>` will be replaced with the value in:
    {
        "variables": {
            "imaVar": "yes you are!"
        }
    }`

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
