import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import { BsDownload, BsThreeDots } from 'react-icons/bs';
import { FiShare2 } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { BiSearch } from 'react-icons/bi';
import { ImFilesEmpty } from 'react-icons/im';
import { HiOutlinePencil, HiOutlineLink } from 'react-icons/hi';
import {RiDeleteBinLine} from 'react-icons/ri';

const Document = (props) => {
    const popoverBottom = (
        <Popover id="popover-positioned-bottom" title="Popover bottom">
          <div className="popvermenu">
                <div id="editfolder">
                    <HiOutlinePencil id="iconfolder"></HiOutlinePencil>{" "} 
                    <span>Edit Folder</span>
                </div>
                <div id="copylink">
                    <HiOutlineLink id="iconfolder"></HiOutlineLink >{" "}
                    <span id="textcopy">Copy Link</span>
                </div>
              <hr></hr>
              <div id="deletefolder">
                    <RiDeleteBinLine id="icondelete"></RiDeleteBinLine>
                    <span>Delete Folder</span>
              </div>
          </div>
        </Popover>
      );

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div className="top-title">
                <p><ImFilesEmpty></ImFilesEmpty> Documents</p>
                <a href="#">Upgrade plan</a>
            </div>
            <div className="document_container">
                <div className="search-upgrade">
                    <div className="search">
                        <BiSearch className='biSearch'></BiSearch>
                        <input type="text" name="search" id="search" placeholder="Search by name"/>
                    </div>
                    <div>
                        <Button variant="primary" onClick={handleShow}><GoPlus className='plus_icon'></GoPlus> New Folder</Button>
                        <Modal show={show} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Folder</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Description" />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>Create</Button>
                                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <Table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created By</th>
                            <th>Created Date</th>
                            <th>Description</th>
                            <th>Share</th>
                            <th>Share With</th>
                            <th>Number of Files</th>
                            <th>Size</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>khang</td>
                            <td>You</td>
                            <td>26 Feb 2022</td>
                            <td>This is description of the folder</td>
                            <td className="switch-toggle">
                                <div className="switch">
                                    <input type="checkbox" id="toggleAll" />
                                    <label htmlFor="toggleAll" />
                                </div>
                            </td>
                            <td><Button variant="secondary" id="btn-share"><FiShare2 className='document_icon' ></FiShare2></Button> Everyone</td>
                            <td>1 file</td>
                            <td>183KB</td>
                            <td className="action">
                                <Button variant="secondary" id="btn-more"><FiShare2 className='document_icon'></FiShare2></Button>
                                <Button variant="secondary" id="btn-more"><BsDownload className='document_icon'></BsDownload></Button>
                                
                                <OverlayTrigger trigger="click" placement="bottomRight" overlay={popoverBottom}>
                                <Button variant="secondary" id="btn-more"><BsThreeDots className='document_icon' ></BsThreeDots></Button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Document;