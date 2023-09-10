import {SandpackClient} from "@codesandbox/sandpack-client";


export async function getClientBaseUrl(client: SandpackClient): Promise<URL | null> {
    // Does not hurt to init preview multiple times because fortunately, the client manages to catch it.
    // @ts-ignore
    const staticPackerUrl: URL = await client.previewController?.initPreview();
    // @ts-ignore
    const bundlerUrl: URL = client.bundlerURL;

    if (staticPackerUrl) {
        return new URL(staticPackerUrl);
    } else if (bundlerUrl) {
        return new URL(bundlerUrl);
    }
    return null;
}

export function shouldNavigatorExist(client: SandpackClient) {
    // @ts-ignore
    const previewController: URL = client.previewController;
    // @ts-ignore
    const bundlerUrl: URL = client.bundlerURL;

    return previewController || bundlerUrl;
}

export function getClientType(client: SandpackClient) {
    // @ts-ignore
    const previewController: URL = client.previewController;
    // @ts-ignore
    const bundlerUrl: URL = client.bundlerURL;

    if (previewController) {
        return "static";
    } else if (bundlerUrl) {
        return "runtime";
    } else {
        return "node";
    }
}
