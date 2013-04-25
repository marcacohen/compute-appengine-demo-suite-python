/**
 * Your project ID, found in the API Console -> Overview -> Project ID
 */
var projectId = 'google.com:launchpad';

/**
 * Your client ID, found in the API Console -> API Access -> Client ID for
 * web applications -> Client ID
 * Please see the README for creation details, if you do not currently have
 * a client ID.
 */
var clientId = '380979171725.apps.googleusercontent.com';

/**
 * Enter the API key from the Google Developer Console, by following these
 * steps:
 * 1) Visit https://code.google.com/apis/console/?api=compute
 * 2) Click on "API Access" in the left column
 * 3) Within the section 'Simple API Access', copy the 'API Key', from
*  field 'Key for browser apps (with referers)'
 */
var apiKey = 'AIzaSyBitlS_n6A5bWgG91XRqSFIYAm5MrCNpK4';

/**
 * To enter one or more authentication scopes, refer to the documentation
 * for the API.
 */
var scopes = 'https://www.googleapis.com/auth/compute';

/**
 * Constants for request parameters.
 */
var API_VERSION = 'v1beta14';
var DEFAULT_PROJECT = projectId;
var DEFAULT_ZONE = 'us-central2-a';
var GOOGLE_PROJECT = 'google';
var DEFAULT_NAME = 'new-node';
var DEFAULT_NAME_WITH_METADATA = 'new-node-with-metadata';
var BASE_URL = 'https://www.googleapis.com/compute/' + API_VERSION +
  '/projects/'
var DEFAULT_IMAGE = BASE_URL + GOOGLE_PROJECT +
  '/global/images/gcel-12-04-v20130104';
var DEFAULT_MACHINE_TYPE = BASE_URL + DEFAULT_PROJECT +
  '/global/machineTypes/n1-standard-1';
var DEFAULT_NETWORK = BASE_URL + DEFAULT_PROJECT +
  '/global/networks/default';
var DEFAULT_FILTER_OPERATION = 'operationType eq insert';

/**
 * A list of example calls to the Google Compute Engine JavaScript client
 * library, as well as associated explanations of each call.
 */
var listApiRequestExplanations = {
  'listInstances': 'This API call queries the Google Compute Engine API ' +
    'for a list of instances in your cluster, and returns the result as ' +
    'a list of Google Compute Engine instances.',

  'listFirewalls': 'This API call queries the Google Compute Engine API ' +
    'for a list of firewalls in your cluster, and returns the result as ' +
    'a list of Google Compute Engine firewalls.',

  'listMachineTypes': 'This API call queries the Google Compute Engine ' +
    'API for a list of all available machine types, and returns the ' +
    'result as a list of Google Compute Engine machine types.',

  'listNetworks': 'This API call queries the Google Compute Engine API ' +
    'for a list of all networks currently in use in your cluster, and ' +
    'returns the result as a list of Google Compute Engine networks.',

  'listGlobalOperations': 'This API call queries the Google Compute ' +
    'Engine API for a list of all the global operations associated ' +
    'with your cluster (inserts, deletes, lists, etc.) and returns the ' +
    'result as a list of Google Compute Engine operations.',

  'listZoneOperations': 'This API call queries the Google Compute ' +
    'Engine API for a list of all the zonal operations associated ' +
    'with your cluster (inserts, deletes, lists, etc.) and returns the ' +
    'result as a list of Google Compute Engine operations.',

  'listOperationsWithFilter': [
    'This API call queries the Google Compute Engine API for a list of ' +
    'all the operations associated with your cluster and adhering to ' +
    'the following filter, and returns the result as a list of Google ' +
    'Compute Engine operations.',
    "'filter': " + DEFAULT_FILTER_OPERATION
  ],

  'listZones': 'This API call queries the Google Compute Engine API for ' +
    'a list of all the currently available data center location and ' +
    'returns the result as a list of Google Compute Engine zones.',

  'insertInstance': [
    'This API call creates an instance with the following parameters, ' +
    'and inserts it into your cluster. It returns the corresponding ' +
    'Google Compute Engine insert instance.',
    "'project': " + DEFAULT_PROJECT,
    "'name': " + DEFAULT_NAME,
    "'image': " + DEFAULT_IMAGE,
    "'machineType': " + DEFAULT_MACHINE_TYPE,
    "'networkInterfaces': [{ 'network': " + DEFAULT_NETWORK + ' }]'
  ],

  'insertInstanceWithMetadata': [
    'This API call creates an instance with the following parameters ' +
    '(including a startup script), and inserts it into your cluster. It ' +
    'returns the corresponding Google Compute Engine insert operation.',
    "'project': " + DEFAULT_PROJECT,
    "'name': " + DEFAULT_NAME_WITH_METADATA,
    "'image': " + DEFAULT_IMAGE,
    "'machineType': " + DEFAULT_MACHINE_TYPE,
    "'networkInterfaces': [{ 'network': " + DEFAULT_NETWORK + ' }]',
    "'metadata': {'items': [{'value': 'apt-get install apache2', 'key':" +
      "'startup-script'}], 'kind': 'compute#metadata'}"],

  'deleteInstance': [
    'This API call deletes the Google Compute Engine instance ' +
    'corresponding to the following parameters, and returns a Google ' +
    'Compute Engine delete operation.',
    "'project': " + DEFAULT_PROJECT,
    "'name': " + DEFAULT_NAME
  ],

  'deleteInstanceWithMetadata': [
    'This API call deletes the Google Compute Engine instance ' +
    'corresponding to the following parameters, and returns a Google ' +
    'Compute Engine delete operation.',
    "'project': " + DEFAULT_PROJECT,
    "'name': " + DEFAULT_NAME_WITH_METADATA
  ],

  'getInstance': [
    'This API call queries the Google Compute Engine API for the ' +
    'instance corresponding to the following parameters, and returns ' +
    'it as a Google Compute Engine instance.',
    "'project': " + DEFAULT_PROJECT,
    "'name': " + DEFAULT_NAME
  ],

  'getInstanceWithMetadata': [
    'This API call queries the Google Compute Engine API for the ' +
    'instance corresponding to the following parameters, and returns it ' +
    'as a Google Compute Engine instance.',
    "'project': " + DEFAULT_PROJECT,
    "'name': " + DEFAULT_NAME_WITH_METADATA
  ]
};

/**
 * Removes the current API result entry in the main-content div, adds the
 * results of the entry for your function.
 * @param {string} apiRequestName The name of the example API request.
 */
function updateApiResultEntry(apiRequestName) {
  listChildren = document.getElementById('main-content')
    .childNodes;
  if (listChildren.length > 1) {
    listChildren[1].parentNode.removeChild(listChildren[1]);
  }
  if (apiRequestName != 'null') {
    window[apiRequestName].apply(this);
  }
}

/**
 * Determines which API request has been selected, and makes a call to add
 * its result entry.
 */
function runSelectedApiRequest() {
  var curElement = document.getElementById('api-selection-options');
  var apiRequestName = curElement.options[curElement.selectedIndex].value;
  updateApiResultEntry(apiRequestName);
}

/**
 * Binds event listeners to handle a newly selected API request.
 */
function addSelectionSwitchingListeners() {
  document.getElementById('api-selection-options')
    .addEventListener('change',
  runSelectedApiRequest, false);
}

/**
 * Template for getting JavaScript sample code snippets.
 * @param {string} method The name of the Google Compute Engine request
 * @param {string} params The parameters passed to method
 */
function getCodeSnippet(method, params) {
  var objConstruction = "// Declare your parameter object\n";
  objConstruction += "var params = {};";
  objConstruction += "\n\n";

  var param = "// Initialize your parameters \n";
  for (i in params) {
    param += "params['" + i + "'] = ";
    param += JSON.stringify(params[i], null, '\t');
    param += ";";
    param += "\n";
  }
  param += "\n";

  var methodCall = "// Make a request to the Google Compute Engine API \n";
  methodCall += "var request = gapi.client." + method + "(params);";
  return objConstruction + param + methodCall;
}

/**
 * Executes your Google Compute Engine request object and, subsequently,
 * inserts the response into the page.
 * @param {string} request A Google Compute Engine request object issued
 *    from the Google Compute Engine JavaScript client library.
 * @param {string} apiRequestName The name of the example API request.
 */
function executeRequest(request, apiRequestName) {
  request.execute(function(resp) {
    var apiRequestNode = document.createElement('div');
    apiRequestNode.id = apiRequestName;

    var apiRequestNodeHeader = document.createElement('h2');
    apiRequestNodeHeader.innerHTML = apiRequestName;

    var apiRequestExplanationNode = document.createElement('div');
    apiRequestExplanationNode.id = apiRequestName + 'RequestExplanation';

    var apiRequestExplanationNodeHeader = document.createElement('h3');
    apiRequestExplanationNodeHeader.innerHTML = 'API Request Explanation';
    apiRequestExplanationNode.appendChild(apiRequestExplanationNodeHeader);

    // When we have an array of data to process, the first element is the
    // API request explanation, and subsequent elements are code examples.
    if (Object.prototype.toString.call(
        listApiRequestExplanations[apiRequestName]) === '[object Array]') {
      var lastIndex = listApiRequestExplanations[apiRequestName].length;
      for (element = 0; element < lastIndex; element++) {
        var apiRequestExplanationEntry = document.createElement('p');
        if (element > 0) {
          apiRequestExplanationEntry.className = 'code-example';
        }
        apiRequestExplanationEntry.innerHTML =
            listApiRequestExplanations[apiRequestName][element];
        apiRequestExplanationNode.appendChild(apiRequestExplanationEntry);
      }
    } else { // Otherwise, there is only an API request explanation.
      var apiRequestExplanationEntry = document.createElement('p');
      apiRequestExplanationEntry.innerHTML =
          listApiRequestExplanations[apiRequestName];
      apiRequestExplanationNode.appendChild(apiRequestExplanationEntry);
    }

    apiRequestNode.appendChild(apiRequestNodeHeader);
    apiRequestNode.appendChild(apiRequestExplanationNode);

    var apiRequestCodeSnippetNode = document.createElement('div');
    apiRequestCodeSnippetNode.id = apiRequestName + 'CodeSnippet';

    var apiRequestCodeSnippetHeader = document.createElement('h3');
    apiRequestCodeSnippetHeader.innerHTML = 'API Request Code Snippet';
    apiRequestCodeSnippetNode.appendChild(apiRequestCodeSnippetHeader);

    var apiRequestCodeSnippetEntry = document.createElement('pre');
    apiRequestCodeSnippetEntry.innerHTML = getCodeSnippet(request.b.method,
        request.b.rpcParams);

    apiRequestCodeSnippetNode.appendChild(apiRequestCodeSnippetEntry);
    apiRequestNode.appendChild(apiRequestCodeSnippetNode);

    var apiResponseEntry = document.createElement('pre');
    apiResponseEntry.innerHTML = JSON.stringify(resp.result, null, ' ');

    var apiResponseNode = document.createElement('div');
    apiResponseNode.id = apiRequestName + 'Response';

    var apiResponseHeader = document.createElement('h3');
    apiResponseHeader.innerHTML = 'API Response';
    apiResponseNode.appendChild(apiResponseHeader);

    var apiResponseEntry = document.createElement('pre');
    apiResponseEntry.innerHTML = JSON.stringify(resp.result, null, ' ');

    apiResponseNode.appendChild(apiResponseEntry);
    apiRequestNode.appendChild(apiResponseNode);

    var content = document.getElementById('main-content');
    content.appendChild(apiRequestNode);
  });
}

/**
 * Google Compute Engine API request to retrieve the list of instances in
 * your Google Compute Engine project.
 */
function listInstances() {
  var request = gapi.client.compute.instances.list({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE
  });
  executeRequest(request, 'listInstances');
}

/**
 * Google Compute Engine API request to insert your resource as an instance
 * into your cluster.
 */
function insertInstance() {
  resource = {
    'image': DEFAULT_IMAGE,
    'name': DEFAULT_NAME,
    'machineType': DEFAULT_MACHINE_TYPE,
    'networkInterfaces': [{
      'network': DEFAULT_NETWORK
    }]
  };

  var request = gapi.client.compute.instances.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'resource': resource
  });
  executeRequest(request, 'insertInstance');
}

/**
 * Google Compute Engine API request to insert your resource (with metadata)
 * as an instance into your cluster.
 */
function insertInstanceWithMetadata() {
  resource = {
    'image': DEFAULT_IMAGE,
    'name': DEFAULT_NAME_WITH_METADATA,
    'machineType': DEFAULT_MACHINE_TYPE,
    'networkInterfaces': [{
      'network': DEFAULT_NETWORK
    }],
    'metadata': {
      'items': [{
        'value': 'apt-get install apache2',
        'key': 'startup-script'
      }],
      'kind': 'compute#metadata'
    }
  };

  var request = gapi.client.compute.instances.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'resource': resource
  });
  executeRequest(request, 'insertInstanceWithMetadata');
}

/**
 * Google Compute Engine API request to retrieve your Google Compute Engine
 * instance.
 */
function getInstance() {
  var request = gapi.client.compute.instances.get({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_NAME
  });
  executeRequest(request, 'getInstance');
}

/**
 * Google Compute Engine API request to retrieve your Google Compute Engine
 * instance (with metadata).
 */
function getInstanceWithMetadata() {
  var request = gapi.client.compute.instances.get({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_NAME_WITH_METADATA
  });
  executeRequest(request, 'getInstanceWithMetadata');
}

/**
 * Google Compute Engine API request to delete your Google Compute Engine
 * instance.
 */
function deleteInstance() {
  var request = gapi.client.compute.instances.delete({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_NAME
  });
  executeRequest(request, 'deleteInstance');
}

/**
 * Google Compute Engine API request to delete your Google Compute Engine
 * instance.
 */
function deleteInstanceWithMetadata() {
  var request = gapi.client.compute.instances.delete({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_NAME_WITH_METADATA
  });
  executeRequest(request, 'deleteInstance');
}

/**
 * Google Compute Engine API request to retreive the list of firewalls for
 * your Google Compute Engine project.
 */
function listFirewalls() {
  var request = gapi.client.compute.firewalls.list({
    'project': DEFAULT_PROJECT
  });
  executeRequest(request, 'listFirewalls');
}

/**
 * Google Compute Engine API request to retreive the list of networks for
 * your Google Compute Engine project.
 */
function listNetworks() {
  var request = gapi.client.compute.networks.list({
    'project': DEFAULT_PROJECT
  });
  executeRequest(request, 'listNetworks');
}

/**
 * Google Compute Engine API request to retreive the list of global
 * operations (inserts, deletes, etc.) for your Google Compute Engine
 * project.
 */
function listGlobalOperations() {
  var request = gapi.client.compute.globalOperations.list({
    'project': DEFAULT_PROJECT
  });
  executeRequest(request, 'listGlobalOperations');
}

/**
 * Google Compute Engine API request to retreive the list of operations
 * (inserts, deletes, etc.) for your Google Compute Engine project.
 */
function listZoneOperations() {
  var request = gapi.client.compute.zoneOperations.list({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE
  });
  executeRequest(request, 'listZoneOperations');
}

/**
 * Google Compute Engine API request to retreive the list of operations
 * (inserts, deletes, etc.) adhering to the specified filter for your
 * Google Compute Engine project.
 */
function listOperationsWithFilter() {
  var request = gapi.client.compute.globalOperations.list({
    'project': DEFAULT_PROJECT,
    'filter': DEFAULT_FILTER_OPERATION
  });
  executeRequest(request, 'listOperationsWithFilter');
}

/**
 * Google Compute Engine API request to retreive the list of machine types
 * available for your Google Compute Engine project.
 */
function listMachineTypes() {
  var request = gapi.client.compute.machineTypes.list({
    'project': DEFAULT_PROJECT
  });
  executeRequest(request, 'listMachineTypes');
}

/**
 * Google Compute Engine API request to retreive the list of data center
 * locations available for your Google Compute Engine project.
 */
function listZones() {
  var request = gapi.client.compute.zones.list({
    'project': DEFAULT_PROJECT
  });
  executeRequest(request, 'listZones');
}

/**
 * Set required API keys and check authentication status.
 */
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}

/**
 * Authorize Google Compute Engine API.
 */
function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

/**
 * Handle initial and subsequent authorization.
 */
function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    initializeApi();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

/**
 * Handle authorization click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}

/**
 * Load the Google Compute Engine API.
 */
function initializeApi() {
  gapi.client.load('compute', API_VERSION, inventoryCluster);
}

/**
 *
 */
function basename(path) {
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

function inventoryCluster() {
  var request = gapi.client.compute.instances.list({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE
  });
  request.execute(function(resp) {
    instances = resp['items'];
    var node_list = [];
    var name_list = [];
    for (i in instances) {
      name = instances[i]['name']
      zone = basename(instances[i]['zone'])
      name_list.push(name);
      node_list.push({radius: 40, color: color(4), name: name});
    }
    set_nodes(node_list);
  });
}

/**
 * Driver for sample application.
 */
$(window)
  .bind('load', function() {
    //addSelectionSwitchingListeners();
    handleClientLoad();
});


