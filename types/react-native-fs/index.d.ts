declare module "react-native-fs"{
    type MkdirOptions = {
        NSURLIsExcludedFromBackupKey?: boolean; // iOS only
    };
    type FSInfoResult = {
        totalSpace: number;   // The total amount of storage space on the device (in bytes).
        freeSpace: number;    // The amount of available storage space on the device (in bytes).
    };
    type ReadDirItem = {
        ctime?:Date;    // The creation date of the file (iOS only)
        mtime?: Date;    // The last modified date of the file
        name: string;     // The name of the item
        path: string;     // The absolute path to the item
        size: string;     // Size in bytes
        isFile: () => boolean;        // Is the file just a file?
        isDirectory: () => boolean;   // Is the file a directory?
    };
    type Headers = { [name: string]: string };
    type Fields = { [name: string]: string };
    type StatResult = {
        name: string;     // The name of the item
        path: string;     // The absolute path to the item
        size: string;     // Size in bytes
        mode: number;     // UNIX file mode
        ctime: number;    // Created date
        mtime: number;    // Last modified date
        isFile: () => boolean;        // Is the file just a file?
        isDirectory: () => boolean;   // Is the file a directory?
    };
    type DownloadFileOptions = {
        fromUrl: string;          // URL to download file from
        toFile: string;           // Local filesystem path to save the file to
        headers?: Headers;        // An object of headers to be passed to the server
        background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
        discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
        progressDivider?: number;
        begin?: (res: DownloadBeginCallbackResult) => void;
        progress?: (res: DownloadProgressCallbackResult) => void;
        resumable?: () => void;    // only supported on iOS yet
        connectionTimeout?: number; // only supported on Android yet
        readTimeout?: number;       // supported on Android and iOS
    };
    type DownloadBeginCallbackResult = {
        jobId: number;          // The download job ID, required if one wishes to cancel the download. See `stopDownload`.
        statusCode: number;     // The HTTP status code
        contentLength: number;  // The total size in bytes of the download resource
        headers: Headers;       // The HTTP response headers from the server
    };

    type DownloadProgressCallbackResult = {
        jobId: number;          // The download job ID, required if one wishes to cancel the download. See `stopDownload`.
        contentLength: number;  // The total size in bytes of the download resource
        bytesWritten: number;   // The number of bytes written to the file so far
    };

    type DownloadResult = {
        jobId: number;          // The download job ID, required if one wishes to cancel the download. See `stopDownload`.
        statusCode: number;     // The HTTP status code
        bytesWritten: number;   // The number of bytes written to the file
    };

    type UploadFileOptions = {
        toUrl: string;            // URL to upload file to
        files: UploadFileItem[];  // An array of objects with the file information to be uploaded.
        headers?: Headers;        // An object of headers to be passed to the server
        fields?: Fields;          // An object of fields to be passed to the server
        method?: string;          // Default is 'POST', supports 'POST' and 'PUT'
        begin?: (res: UploadBeginCallbackResult) => void;
        progress?: (res: UploadProgressCallbackResult) => void;
    };

    type UploadFileItem = {
        name: string;       // Name of the file, if not defined then filename is used
        filename: string;   // Name of file
        filepath: string;   // Path to file
        filetype: string;   // The mimetype of the file to be uploaded, if not defined it will get mimetype from `filepath` extension
    };

    type UploadBeginCallbackResult = {
        jobId: number;        // The upload job ID, required if one wishes to cancel the upload. See `stopUpload`.
    };

    type UploadProgressCallbackResult = {
        jobId: number;                      // The upload job ID, required if one wishes to cancel the upload. See `stopUpload`.
        totalBytesExpectedToSend: number;   // The total number of bytes that will be sent to the server
        totalBytesSent: number;             // The number of bytes sent to the server
    };

    type UploadResult = {
        jobId: number;        // The upload job ID, required if one wishes to cancel the upload. See `stopUpload`.
        statusCode: number;   // The HTTP status code
        headers: Headers;     // The HTTP response headers from the server
        body: string;         // The HTTP response body
    };
    interface RNFS {
        mkdir(filepath: string, options: MkdirOptions): Promise<void>,

        moveFile(filepath: string, destPath: string): Promise<void>

        copyFile(filepath: string, destPath: string): Promise<void>

        pathForBundle(bundleNamed: string): Promise<string>

        pathForGroup(groupName: string): Promise<string>

        getFSInfo(): Promise<FSInfoResult>

        getAllExternalFilesDirs(): Promise<string>

        unlink(filepath: string): Promise<void>

        exists(filepath: string): Promise<boolean>

        stopDownload(jobId: number): void

        resumeDownload(jobId: number): void

        isResumable(jobId: number): Promise<boolean>

        stopUpload(jobId: number): void

        completeHandlerIOS(jobId: number): void

        readDir(dirpath: string): Promise<ReadDirItem[]>

        // Android-only
        readDirAssets(dirpath: string): Promise<ReadDirItem[]>

        // Android-only
        existsAssets(filepath: string): Promise<boolean>;

        // Node style version (lowercase d). Returns just the names
        readdir(dirpath: string): Promise<string[]>

        // setReadable for Android
        setReadable(filepath: string, readable: boolean, ownerOnly: boolean): Promise<boolean>

        stat(filepath: string): Promise<StatResult>

        readFile(filepath: string, encodingOrOptions?: any): Promise<string>

        read(filepath: string, length: number, position: number, encodingOrOptions?: any): Promise<string>

        // Android only
        readFileAssets(filepath: string, encodingOrOptions?: any): Promise<string>

        hash(filepath: string, algorithm: string): Promise<string>

        // Android only
        copyFileAssets(filepath: string, destPath: string): Promise<string>

        // iOS only
        // Copies fotos from asset-library (camera-roll) to a specific location
        // with a given width or height
        // @see: https://developer.apple.com/reference/photos/phimagemanager/1616964-requestimageforasset
        copyAssetsFileIOS(imageUri: string, destPath: string, width: number, height: number,
                          scale: number, compression: number, resizeMode: string): Promise<string>

        // iOS only
        // Copies fotos from asset-library (camera-roll) to a specific location
        // with a given width or height
        // @see: https://developer.apple.com/reference/photos/phimagemanager/1616964-requestimageforasset
        copyAssetsVideoIOS(imageUri: string, destPath: string): Promise<string>

        writeFile(filepath: string, contents: string, encodingOrOptions?: any): Promise<void>

        appendFile(filepath: string, contents: string, encodingOrOptions?: any): Promise<void>

        write(filepath: string, contents: string, position?: number, encodingOrOptions?: any): Promise<void>

        downloadFile(options: DownloadFileOptions): { jobId: number, promise: Promise<DownloadResult> }

        uploadFiles(options: UploadFileOptions): { jobId: number, promise: Promise<UploadResult> }

        touch(filepath: string, mtime?: Date, ctime?: Date): Promise<void>

        MainBundlePath: string,
        CachesDirectoryPath: string,
        DocumentDirectoryPath: string,
        ExternalDirectoryPath: string,
        ExternalStorageDirectoryPath: string,
        TemporaryDirectoryPath: string,
        LibraryDirectoryPath: string,
        PicturesDirectoryPath: string
    }
    const rnfs:RNFS;
    export =rnfs;
}