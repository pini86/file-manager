# file-manager

- The program is started by npm-script `start` in following way:
```bash
npm run start -- --username=your_username
```
### Warning! Username cannot start with a space !

Syntax of Compress and decompress operations:

- Compress and decompress operations  
    - Compress file 
    ```bash
    compress path_to_file path_to_destination
    ```
    - Decompress file  
    ```bash
    decompress path_to_file path_to_destination
### Note! "path_to_destination" - the path to the destination file ! If the specified folder in path does not exist, it will be created automatically!
