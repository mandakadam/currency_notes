# Credcli - command line tool

## Prerequisite 

1. NodeJs 10.* must be installed

## Install credcli tool

1. Fire the below command to install `credcli` command line tool, 

    ```bash
    npm i -g credcli
    ```

## Steps to Add Macro - [Video](https://cred-iwf.s3.ap-south-1.amazonaws.com/video/macro/Add+Macro.mov)
1. Fire `credcli macro:add` command

    ``` bash
    credcli macro:add 
    --name bankcif 
    --label "Fetch CIF" 
    --app rmoneview 
    --route /customer-relationship/client 
    --folder /Users/prabhuvikas/repos/iwf-dev/macros/
    ```

2. Make changes in app function

3. Check the action on the screen.
In this case rmoneview's customer-relationship route.

## Steps to Remove Macro - [Video](https://cred-iwf.s3.ap-south-1.amazonaws.com/video/macro/Remove+macro.mov)

1. Fire `credcli macro:remove` command

    ``` bash
    credcli macro:remove 
    --name bankcif 
    --folder /Users/prabhuvikas/repos/iwf-dev/macros/
    ```

2. Removes the macro files and configuration 