/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview Display status squares for instances.
 *
 * Creates color block and updates the colors according to instance status.
 *
 */

/**
 * The Squares class controls the color blocks representing instance statuses
 * in the given HTML container. Each block is given an ID equal to the instance
 * name, using the given instanceNames.
 * Optional options are available to customize the squares including:
 * <ul>
 * <li>statusClasses: custom colors for OTHER, TERMINATED, PROVISIONING,
 * STAGING, and RUNNING. OTHER is used for initial color and if an
 * unknown status is returned.</li>
 * <li>drawOnStart: true or false, true will automatically draw the squares
 * when the start method is run from the Gce startInstances method.
 * Otherwise, the squares need to be manually drawn using drawSquares.</li>
 * <li>cols: the number of columns. If not set, this defaults to the
 * ceil(sqrt) of the number of instances.</li>
 * </ul>
 * @constructor
 * @param {Element} container HTML element in which to display the squares.
 * @param {Array.<string>} instanceNames List of instance names.
 * @param {Object} squareOptions Options for the square (optional).
 */
var Squares = function(container, instanceNames, squareOptions) {
  this.container_ = container;
  this.instanceNames_ = instanceNames;
  if (squareOptions.statusClasses) {
    this.statusClasses_ = squareOptions.statusClasses;
  } else {
    this.statusClasses_ = {
      'OTHER': 'grey',
      'TERMINATED': 'grey',
      'STOPPING': 'orange',
      'PROVISIONING': 'orange',
      'STAGING': 'yellow',
      'RUNNING': 'green'
    };
  }
  if (squareOptions.drawOnStart) {
    this.start = this.drawSquares;
  }
  if (squareOptions.cols) {
    this.cols_ = squareOptions.cols;
  }
};

/**
 * Container for the squares.
 * @type {Element}
 * @private
 */
Squares.prototype.container_ = null;

/**
 * The number of columns in the UI display.
 * @type {number}
 * @private
 */
Squares.prototype.cols_ = null;

/**
 * The default status colors. These are just classNames and can be customized
 * using the squareOptions object during initialization.
 * @type {Object}
 * @private
 */
Squares.prototype.statusClasses_ = null;

/**
 * The string of instance names.
 * @type {Array.<string>}
 * @private
 */
Squares.prototype.instanceNames_ = null;

/**
 * If drawOnStart is true, this variable is set equal to the this.drawSquares
 * function. When a Square object is passed as a UI option to the Gce class,
 * the Gce class will call the start method in the startInstances function.
 * @type {Function}
 */
Squares.prototype.start = null;

/**
 * Draws the squares on the HTML page.
 */
Squares.prototype.drawSquares = function() {
  // First, clean up any old instace squares.
  this.reset();

  // If the num of cols is not set, create up to 25 cols based on the
  // number of instances.
  var numInstances = this.instanceNames_.length;
  if (!this.cols_) {
    this.cols_ = Math.ceil(Math.sqrt(numInstances));
    if (this.cols_ > 25) {
      this.cols_ = 25;
    }
  }

  // Add the columns.
  for (var i = 0; i < this.cols_; i++) {
    var col = document.createElement('div');
    col.className = 'span1';
    col.id = 'col-' + i;
    this.container_.appendChild(col);
  }

  // Add the color squares.
  for (var i = 0; i < this.instanceNames_.length; i++) {
    // TAG is defined in the html file as a template variable
    var instanceName = this.instanceNames_[i];
    var color = document.createElement('div');
    color.className = 'color-block ' + this.statusClasses_['OTHER'];
    color.id = instanceName;
    var columnNum = i % this.cols_;
    $('#col-' + columnNum).append(color);
  }
};

/**
 * Changes the color of the squares according to the instance status. Called
 * during the Gce.heartbeat.
 * @param {Object} updateData The status data returned from the server.
 */
Squares.prototype.update = function(updateData) {
  var data = updateData['data'];
  for (var i = 0; i < this.instanceNames_.length; i++) {
    var instanceName = this.instanceNames_[i];
    var color = null;
    if (data.hasOwnProperty(instanceName)) {
      var status = data[instanceName]['status'];
      color = this.statusClasses_[status];
      if (!color) {
        color = this.statusClasses_['OTHER'];
      }
    } else {
      color = this.statusClasses_['TERMINATED'];
    }
    var jqueryId = '#' + instanceName;
    this.colorize(jqueryId, color);
  }
};

/**
 * Reset the squares.
 */
Squares.prototype.reset = function() {
  $(this.container_).empty();
};

/**
 * Colors the HTML element with the given color / class and jquery id.
 * @param {String} jqueryId JQuery ID of element to be updated.
 * @param {String} color Class name to update.
 */
Squares.prototype.colorize = function(jqueryId, color) {
  for (var status in this.statusClasses_) {
    $(jqueryId).removeClass(this.statusClasses_[status]);
  }
  $(jqueryId).addClass(color);
};
