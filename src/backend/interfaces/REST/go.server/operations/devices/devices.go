/*
 * // Copyleft (ɔ) 2018 The Caliopen contributors.
 * // Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
 * // license (AGPL) that can be found in the LICENSE file.
 */

package devices

import (
	"bytes"
	"errors"
	"fmt"
	. "github.com/CaliOpen/Caliopen/src/backend/defs/go-objects"
	"github.com/CaliOpen/Caliopen/src/backend/interfaces/REST/go.server/middlewares"
	"github.com/CaliOpen/Caliopen/src/backend/main/go.main"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	swgErr "github.com/go-openapi/errors"
	"github.com/satori/go.uuid"
	"net/http"
	"strconv"
	"strings"
)

// NewDevice handles POST /devices
func NewDevice(ctx *gin.Context) {
	var device Device
	b := binding.JSON
	if err := b.Bind(ctx.Request, &device); err == nil {
		user_uuid, _ := uuid.FromString(ctx.MustGet("user_id").(string))
		device.UserId.UnmarshalBinary(user_uuid.Bytes())
		if device.Name == "" || strings.Replace(device.Name, " ", "", -1) == "" {
			err := errors.New("device's name is empty")
			e := swgErr.New(http.StatusBadRequest, err.Error())
			http_middleware.ServeError(ctx.Writer, ctx.Request, e)
			ctx.Abort()
			return
		}
		if device.Type == "" || strings.Replace(device.Type, " ", "", -1) == "" {
			err := errors.New("device's type is empty")
			e := swgErr.New(http.StatusBadRequest, err.Error())
			http_middleware.ServeError(ctx.Writer, ctx.Request, e)
			ctx.Abort()
			return
		}
		device.Name = strings.TrimSpace(device.Name)
		device.Type = strings.TrimSpace(device.Type)

		device.IpCreation = ctx.ClientIP()
		device.UserAgent = ctx.GetHeader("User-Agent")

		err := caliopen.Facilities.RESTfacility.CreateDevice(&device)
		if err != nil {
			returnedErr := new(swgErr.CompositeError)
			if err.Code() == DbCaliopenErr && err.Cause().Error() == "not found" {
				returnedErr = swgErr.CompositeValidationError(swgErr.New(http.StatusNotFound, "db returned not found"), err, err.Cause())
			} else {
				returnedErr = swgErr.CompositeValidationError(err, err.Cause())
			}
			http_middleware.ServeError(ctx.Writer, ctx.Request, returnedErr)
			ctx.Abort()
		} else {
			ctx.JSON(http.StatusOK, struct {
				Location string `json:"location"`
				DeviceId string `json:"device_id"`
			}{
				http_middleware.RoutePrefix + http_middleware.DevicesRoute + "/" + device.DeviceId.String(),
				device.DeviceId.String(),
			})
		}
	} else {
		e := swgErr.New(http.StatusBadRequest, fmt.Sprintf("Unable to json marshal the provided payload : %s", err))
		http_middleware.ServeError(ctx.Writer, ctx.Request, e)
		ctx.Abort()
	}
}

// GetDevicesList handles GET /devices
func GetDevicesList(ctx *gin.Context) {
	userId := ctx.MustGet("user_id").(string)
	devices, err := caliopen.Facilities.RESTfacility.RetrieveDevices(userId)
	if err != nil {
		returnedErr := new(swgErr.CompositeError)
		if err.Code() == DbCaliopenErr && err.Cause().Error() == "devices not found" {
			returnedErr = swgErr.CompositeValidationError(swgErr.New(http.StatusNotFound, "db returned not found"), err, err.Cause())
		} else {
			returnedErr = swgErr.CompositeValidationError(err, err.Cause())
		}
		http_middleware.ServeError(ctx.Writer, ctx.Request, returnedErr)
		ctx.Abort()
	} else {
		var respBuf bytes.Buffer
		respBuf.WriteString("{\"total\": " + strconv.Itoa(len(devices)) + ",")
		respBuf.WriteString(("\"devices\":["))
		first := true
		for _, device := range devices {
			json_device, err := device.MarshalFrontEnd()
			if err == nil {
				if first {
					first = false
				} else {
					respBuf.WriteByte(',')
				}
				respBuf.Write(json_device)
			}
		}
		respBuf.WriteString("]}")
		ctx.Data(http.StatusOK, "application/json; charset=utf-8", respBuf.Bytes())
	}
}

// GetDevice handles GET /devices/:deviceID
func GetDevice(ctx *gin.Context) {
	ctx.AbortWithStatus(http.StatusNotImplemented)
}

// PatchDevice handles PATCH /devices/:deviceID
func PatchDevice(ctx *gin.Context) {
	ctx.AbortWithStatus(http.StatusNotImplemented)
}

// DeleteDevice handles DELETE /devices/:deviceID
func DeleteDevice(ctx *gin.Context) {
	ctx.AbortWithStatus(http.StatusNotImplemented)
}
